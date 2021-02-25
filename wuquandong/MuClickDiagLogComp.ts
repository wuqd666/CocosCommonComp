/**
 * 需要
 */

import DiagLogComp from "./DiagLogComp";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MuClickDiagLogComp extends DiagLogComp {

    btnClick(sender: cc.Node) {
        sender.children.forEach((child, index) => {
            child.opacity = index <= this._curIndex ? 255 : 0;
            if (index == this._curIndex) {
                if (child.getComponentInChildren(cc.AudioSource)) {
                    child.getComponentInChildren(cc.AudioSource).play()
                }
            }

        })
        this._curIndex++;
    }

    protected _curIndex: number = 0;
}
