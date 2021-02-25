import { H5RoleType } from "../../../framework/constant/GameConstant";
import { UserMgr } from "../../../framework/model/UserModel";
import ITEM, { EventTypeEnum } from "../TheItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PageCommonComp extends cc.Component {

    @property([cc.Node])
    pages: cc.Node[] = [];

    @property(cc.Node)
    nextPageBtn: cc.Node = null;
    @property(cc.Node)
    prePageBtn: cc.Node = null;

    curSubTitleIndex: number = 0;

    start() {
        this.pages.forEach((pageNode, index) => {
            pageNode.active = index == this.curSubTitleIndex;
        })
        this.updateBtnState();

        if (this.nextPageBtn) {
            let itemComp = this.nextPageBtn.getComponent(ITEM);
            if (!itemComp) {
                itemComp = this.nextPageBtn.addComponent(ITEM);
            }
            itemComp.eventType = EventTypeEnum.Click;
            // 添加点击事件
            let clickEvnet = new cc.Component.EventHandler();
            clickEvnet.component = 'PageCommonComp';
            clickEvnet.handler = 'btnNextClick'
            clickEvnet.target = this.node;
            itemComp.onclick = clickEvnet;
            itemComp.makeUnactive4Student = true;
        }

        if (this.prePageBtn) {
            let itemComp = this.prePageBtn.getComponent(ITEM);
            if (!itemComp) {
                itemComp = this.prePageBtn.addComponent(ITEM);
            }
            itemComp.eventType = EventTypeEnum.Click;
            // 添加点击事件
            let clickEvnet = new cc.Component.EventHandler();
            clickEvnet.component = 'PageCommonComp';
            clickEvnet.handler = 'btnPreClick'
            clickEvnet.target = this.node;
            itemComp.onclick = clickEvnet;
            itemComp.makeUnactive4Student = true;
        }
    }

    btnPreClick(sender: cc.Node) {
        this.curSubTitleIndex--;
        if (this.curSubTitleIndex < 0) {
            this.curSubTitleIndex = 0;
        }
        this.pages.forEach((pageNode, index) => {
            pageNode.active = index == this.curSubTitleIndex;
        });
        this.updateBtnState();
    }

    btnNextClick(sender: cc.Node) {
        this.curSubTitleIndex++;
        if (this.curSubTitleIndex >= this.pages.length) {
            this.curSubTitleIndex = this.pages.length - 1;
        }
        this.pages.forEach((pageNode, index) => {
            pageNode.active = index == this.curSubTitleIndex;
        });
        this.updateBtnState();
    }

    updateBtnState() {
        if (UserMgr.userInfo.roleType != H5RoleType.TEACHER) {
            return;
        }

        this.prePageBtn.active = this.curSubTitleIndex > 0;
        this.nextPageBtn.active = this.curSubTitleIndex < this.pages.length - 1;
    }


}
