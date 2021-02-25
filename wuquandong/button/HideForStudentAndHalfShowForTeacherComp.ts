import { send } from "process";
import { H5RoleType } from "../../../../framework/constant/GameConstant";
import { UserMgr } from "../../../../framework/model/UserModel";
import ITEM from "../../TheItem";
import BaseButtonComp from "./BaseButtonComp";


const {ccclass, property} = cc._decorator;

@ccclass
export default class HideForStudentAndHalfShowForTeacherComp extends BaseButtonComp {

    @property({
        tooltip: '是否循环显示'
    })
    toggle: boolean = false;
    @property()
    _interactable: boolean = true;

    @property
    get interactable () {
        return this._interactable;
    }

    set interactable (value) {
        this._interactable = value;
        this.node.getComponent(ITEM).interactable = this.interactable;
    }

    start () {
        super.start()
        this.node.getComponent(ITEM).stuHideAndTeacherShowShadow = true;
        this.node.getComponent(ITEM).interactable = this.interactable;
    }

    btnClick (sender: cc.Node) {
        super.btnClick(sender);
        if (!this.toggle) {
            sender.opacity = 255;
        }else {
            if (UserMgr.userInfo.roleType == H5RoleType.TEACHER) {
                sender.opacity = sender.opacity == 255 ? 155 : 255;
            }else {
                sender.opacity = sender.opacity == 255 ? 0 : 255;
            }
        }
    }
}
