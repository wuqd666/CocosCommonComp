/**
 * 需要
 */

import DiagLogComp from "./DiagLogComp";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MuClickDiagLogComp extends DiagLogComp {

    @property({
        tooltip: ''
    })
    isCover: boolean = true;

    btnClick(sender: cc.Node) {
        this._curIndex++;
        sender.children.forEach(child => {
            child.active = false;
        })
        if (this.isCover) {
            if (sender.children[this._curIndex - 1]) {
                sender.children[this._curIndex - 1].opacity = 255;
                sender.children[this._curIndex - 1].active = true;
            }
        } else {
            sender.children.forEach((child,index) => {
                child.active = index < this._curIndex;
                child.opacity = index < this._curIndex ? 255 : 0;
            })
        }

        if (sender.children[this._curIndex - 1].getComponentInChildren(cc.AudioSource)) {
            sender.children[this._curIndex - 1].getComponentInChildren(cc.AudioSource).play();
            return
        }
        if (sender.children[this._curIndex - 1].getComponent(cc.AudioSource)) {
            sender.children[this._curIndex - 1].getComponent(cc.AudioSource).play();
            return
        }
    }

    protected _curIndex: number = 0;
}
