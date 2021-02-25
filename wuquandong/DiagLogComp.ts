import ITEM, { EventTypeEnum } from "../TheItem";
const { ccclass, property } = cc._decorator;

/**
 * 显示对话框的组件
 */
@ccclass
export default class DiagLogComp extends cc.Component {

    @property()
    _isExactClickCheck: boolean = false;

    @property
    get isExactClickCheck() {
        return this._isExactClickCheck;
    };

    @property({
        tooltip: '是否延迟播放声音'
    })
    isDelayPlayAudio: boolean = false;
    @property({
        tooltip: '老师半透学生不可见'
    })
    stuHideAndTeacherShowShadow: boolean = false;

    set isExactClickCheck(value) {
        this._isExactClickCheck = value;
        if (value) {
            if (this.node.getComponent(ITEM)) {
                this.node.getComponent(ITEM).isExactClickCheck = this.isExactClickCheck;
            }
        }
    }

    start() {
        let itemComp = this.node.getComponent(ITEM);
        if (!itemComp) {
            itemComp = this.node.addComponent(ITEM);
        }
        itemComp.eventType = EventTypeEnum.Click;
        let clickEvnet = new cc.Component.EventHandler();
        clickEvnet.component = 'DiagLogComp';
        clickEvnet.handler = 'btnClick'
        clickEvnet.target = this.node;
        itemComp.onclick = clickEvnet;
        itemComp.isExactClickCheck = this.isExactClickCheck;
        if (this.isExactClickCheck) {
            itemComp.node._hitTest = itemComp._hitTest.bind(itemComp);
        }
    }

    btnClick(sender: cc.Node) {
        if (!this.isDelayPlayAudio) {
            sender.children.forEach(child=>{
                child.opacity = 255;
            })
            if (sender.getComponentInChildren(cc.AudioSource)) {
                sender.getComponentInChildren(cc.AudioSource).play();
                return
            }
            if (sender.getComponent(cc.AudioSource)) {
                sender.getComponent(cc.AudioSource).play();
                return
            }
            if (this.stuHideAndTeacherShowShadow) {
                sender.opacity = 255;
            }
        }else {
            if (this.stuHideAndTeacherShowShadow && sender.opacity != 255) {
                sender.opacity = 255;
                return;
            }
            if (sender.children.filter(child=>{return child.opacity != 255}).length > 0) {
                sender.children.forEach(child=>{
                    child.opacity = 255;
                })
            }else {
                if (sender.getComponentInChildren(cc.AudioSource)) {
                    sender.getComponentInChildren(cc.AudioSource).play();
                    return
                }
                if (sender.getComponent(cc.AudioSource)) {
                    sender.getComponent(cc.AudioSource).play();
                    return
                }
            }
        }
       
    }
}
}
