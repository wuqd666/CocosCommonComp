import { PanelManager } from "../../../../manager/PanelManager";
import ITEM, { EventTypeEnum } from "../../TheItem";


const {ccclass, property} = cc._decorator;

@ccclass
export default class BaseButtonComp extends cc.Component {

    start () {
        let itemComp = this.node.getComponent(ITEM);
        if (!itemComp) {
            itemComp = this.node.addComponent(ITEM);
        }
        itemComp.eventType = EventTypeEnum.Click;
        let clickEvnet = new cc.Component.EventHandler();
        clickEvnet.component = 'BaseButtonComp';
        clickEvnet.handler = 'btnClick'
        clickEvnet.target = this.node;
        itemComp.onclick = clickEvnet;
    }

    btnClick(sender: cc.Node) {

        if (PanelManager.getInstance().curPanelBase) {
            PanelManager.getInstance().curPanelBase._dragItemClick(sender);
        }

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
