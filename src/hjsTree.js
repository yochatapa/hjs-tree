'use strict';
function HjsTree(option){
	/** HjsTree()호출 방지 */
	if(!new.target){
		return new HjsTree();
	}

    this._option={
        changeNum   : 0,
        dragNum     : 0,
    };
    
    if(!!option){
        this.init(option);
    }
}

HjsTree.prototype.init = function(option){
    this.initOption(option);
    this.setTreeNode();
    this.renderTree();

    if(this._option.changeNum==0){
        if(!!this._option.dataset){
            let obj = this;
            if(!!this._option.treeNode[1]){
                for(let [col,val] of Object.entries(this._option.treeNode[1].getData())){
                    let target = document.querySelectorAll("[name='"+this._option.dataset+"_"+col+"']");
                    if(target.length>0) {
                        this._option.changeNum++;
                        target.forEach(item=>{
                            item.addEventListener('change',function(){
                                if(obj.getSelectedNodes().length==1){
                                    let node = obj.getSelectedNode();
                                    let id = item.name.replace(obj._option.dataset+"_","");
                                    let flag = node.setNodeValue(id,item.value);
                        
                                    if(flag != 0){
                                        item.value = node.getNodeValue(id);
                                    }
                                }
                            })
                            let targetName = item.getAttribute("name");
                            // POWER MDD 용
                            // if(datePickerList[targetName] != undefined && datePickerList[targetName] != null){
                            //     datePickerList[targetName].on('close',()=>{
                            //         if(obj.getSelectedNodes().length==1){
                            //             let node = obj.getSelectedNode();
                            //             let id = item.name.replace(obj._option.dataset+"_","");
                            //             let flag = node.setNodeValue(id,item.value);
                            
                            //             if(flag != 0){
                            //                 item.value = node.getNodeValue(id);
                            //             }
                            //         }
                            //     })
                            // }
                        })
                    }
                }
            }else{
                let target = document.querySelectorAll("[name^='"+this._option.dataset+"_']");
                if(target.length>0) {
                    this._option.changeNum++;
                    target.forEach(item=>{
                        item.addEventListener('change',function(){
                            if(obj.getSelectedNodes().length==1){
                                let node = obj.getSelectedNode();
                                let id = item.name.replace(obj._option.dataset+"_","");
                                let flag = node.setNodeValue(id,item.value);
                    
                                if(flag != 0){
                                    item.value = node.getNodeValue(id);
                                }
                            }
                        })
                        let targetName = item.getAttribute("name");
                        // POWER MDD 용
                        // if(datePickerList[targetName] != undefined && datePickerList[targetName] != null){
                        //     datePickerList[targetName].on('close',()=>{
                        //         if(obj.getSelectedNodes().length==1){
                        //             let node = obj.getSelectedNode();
                        //             let id = item.name.replace(obj._option.dataset+"_","");
                        //             let flag = node.setNodeValue(id,item.value);
                        
                        //             if(flag != 0){
                        //                 item.value = node.getNodeValue(id);
                        //             }
                        //         }
                        //     })
                        // }
                    })
                }
            }
        }
    }   
        
    if(this._option.dragNum==0){
        let obj = this;
    
        let target = document.querySelectorAll(this._option.selector);
        
        for(let idx=0;idx<target.length;idx++){
            this._option.dragNum++;
            target[idx].addEventListener('mousemove', function(event) {
                if (!obj._option.isDragging) {
                    return;
                }
                
                // 이전 위치에서의 변위를 계산합니다.
                obj._option.offsetX = event.clientX - obj._option.originalX;
                obj._option.offsetY = event.clientY - obj._option.originalY;
        
                // 현재 위치에 변위만큼 이동한 위치를 설정합니다.
                let info = obj._option.dragNodeInfo;
                let tInfo = target[idx].getBoundingClientRect();
                obj._option.dragNode.getNodeElement().setAttribute("style",`position:absolute;top:${info.y-tInfo.y+obj._option.offsetY}px;left:${info.x-tInfo.x+obj._option.offsetX}px;width:${info.width}px;height:${info.height}px;`);

                for (const [key,dropzone] of Object.entries(obj._option.treeNode)) {
                    if(dropzone.getIndex()==0) continue;
                    if(!!obj._option.dragOption){
                        if(obj._option.dragOption.moveParent === false){
                            if(dropzone.parentNode.getIndex() !== obj._option.dragNode.parentNode.getIndex()) continue;
                        }
                    }
                    const dropzoneMain = dropzone.getMain();
                    const dropzoneRect = dropzoneMain.getBoundingClientRect();
                    if (
                        event.clientX < dropzoneRect.x + dropzoneRect.width &&
                        event.clientX > dropzoneRect.x &&
                        event.clientY < dropzoneRect.y + dropzoneRect.height &&
                        event.clientY > dropzoneRect.y &&
                        dropzone != obj._option.dragNode
                    ) {
                        if(obj._option.prevElement != dropzoneMain){
                            if(!!obj._option.prevElement){
                                let index = obj.getIndexByElement(obj._option.prevElement);
                                let node = obj.getNode(index);
                                if(!!node){
                                    node.getTop().setAttribute("style","height:0px;margin-bottom:0px");
                                    node.getMiddle().setAttribute("style","height:0px;margin-bottom:0px");
                                    node.getBottom().setAttribute("style","height:0px;margin-bottom:0px");
                                }   
                            }
                            obj._option.prevElement = dropzoneMain;
                        }
                        dropzone.getTop().setAttribute("style","height:10px;margin-bottom:5px");
                        dropzone.getMiddle().setAttribute("style","height:10px;margin-bottom:5px");
                        
                        if(obj._option.draggable){
                            if(!!!obj._option.dragOption || obj._option.dragOption?.moveParent !== false){
                                dropzone.getBottom().setAttribute("style","height:10px;margin-bottom:5px");
                            }
                        }
                        
                        break;
                    }
                }
                
            });

            target[idx].addEventListener('touchmove', function(event) {
                console.log("touchmove",event, obj._option.isDragging);
                
                if (!obj._option.isDragging) {
                    return;
                }else{
                    event.preventDefault();
                }
                
                // 이전 위치에서의 변위를 계산합니다.
                obj._option.offsetX = event.touches[0].clientX - obj._option.originalX;
                obj._option.offsetY = event.touches[0].clientY - obj._option.originalY;
        
                // 현재 위치에 변위만큼 이동한 위치를 설정합니다.
                let info = obj._option.dragNodeInfo;
                let tInfo = target[idx].getBoundingClientRect();
                obj._option.dragNode.getNodeElement().setAttribute("style",`position:absolute;top:${info.y-tInfo.y+obj._option.offsetY}px;left:${info.x-tInfo.x+obj._option.offsetX}px;width:${info.width}px;height:${info.height}px;`);
        
                for (const [key,dropzone] of Object.entries(obj._option.treeNode)) {
                    if(dropzone.getIndex()==0) continue;
                    if(!!obj._option.dragOption){
                        if(obj._option.dragOption.moveParent === false){
                            if(dropzone.parentNode.getIndex() !== obj._option.dragNode.parentNode.getIndex()) continue;
                        }
                    }
                    const dropzoneMain = dropzone.getMain();
                    let dropzoneRect = dropzoneMain.getBoundingClientRect();
                    if (
                        event.touches[0].clientX < dropzoneRect.x + dropzoneRect.width &&
                        event.touches[0].clientX > dropzoneRect.x &&
                        event.touches[0].clientY < dropzoneRect.y + dropzoneRect.height &&
                        event.touches[0].clientY > dropzoneRect.y &&
                        dropzone != obj._option.dragNode
                    ) {
                        if(obj._option.prevElement != dropzoneMain){
                            if(!!obj._option.prevElement){
                                let index = obj.getIndexByElement(obj._option.prevElement);
                                let node = obj.getNode(index);
                                if(!!node){
                                    node.getTop().setAttribute("style","height:0px;margin-bottom:0px");
                                    node.getMiddle().setAttribute("style","height:0px;margin-bottom:0px");
                                    node.getBottom().setAttribute("style","height:0px;margin-bottom:0px");
                                }   
                            }
                            obj._option.prevElement = dropzoneMain;
                        }
                        dropzone.getTop().setAttribute("style","height:20px;margin-bottom:5px");
                        dropzone.getMiddle().setAttribute("style","height:20px;margin-bottom:5px");
                        if(!!obj._option.dragOption){
                            if(obj._option.dragOption.moveParent !== false){
                                dropzone.getBottom().setAttribute("style","height:20px;margin-bottom:5px");
                            }
                        }
                        
                        break;
                    }
                }
                
            });
        
            document.addEventListener('mouseup', function(event) {
                if(!obj._option.isDragging) return;
                document.querySelector(obj._option.selector).classList.remove("tree-move")
                obj._option.isDragging = false;
                let dragNode = obj._option.dragNode;
                let dragNodeElement = dragNode.getNodeElement();
                
                for (const [key,dropzone] of Object.entries(obj._option.treeNode)) {
                    //top
                    
                    if(dropzone.getIndex()==0) continue;
                    let dropzoneTarget = dropzone.getTop();
                    let dropzoneRect = dropzoneTarget.getBoundingClientRect();
                    
                    if (
                        event.clientX < dropzoneRect.x + dropzoneRect.width &&
                        event.clientX > dropzoneRect.x &&
                        event.clientY < dropzoneRect.y + dropzoneRect.height &&
                        event.clientY > dropzoneRect.y &&
                        dropzone != dragNode
                    ) {
                        
                        //obj._option.dragNode를 dropzone으로 옮기기
                        dragNodeElement.style.transform = "";
                        document.getElementById("tempTreeDraggableDiv")?.remove();
        
                        if(!!dropzone.getParentNode())
                            dragNode.moveNode(dropzone.getParentNode().getIndex(),"before",dropzone.getNodeElement());
                        else
                            dragNode.moveNode(-1,"before",dropzone.getNodeElement());
                        
                        dropzone.getTop().setAttribute("style","height:0px;margin-bottom:0px");
                        dropzone.getMiddle().setAttribute("style","height:0px;margin-bottom:0px");
                        dropzone.getBottom().setAttribute("style","height:0px;margin-bottom:0px");
                        dragNode.getNodeElement().removeAttribute('style');
                        break;
                    }
                    
                    //middle
                    dropzoneTarget = dropzone.getMiddle();
                    dropzoneRect = dropzoneTarget.getBoundingClientRect();
                    if (
                        event.clientX < dropzoneRect.x + dropzoneRect.width &&
                        event.clientX > dropzoneRect.x &&
                        event.clientY < dropzoneRect.y + dropzoneRect.height &&
                        event.clientY > dropzoneRect.y &&
                        dropzone != dragNode
                    ) {
                        //obj._option.dragNode를 dropzone으로 옮기기
                        dragNodeElement.style.transform = "";
                        document.getElementById("tempTreeDraggableDiv")?.remove();
                        dragNode.moveNode(dropzone.getParentNode().getIndex(),"after",dropzone.getNodeElement());
        
                        dropzone.getTop().setAttribute("style","height:0px;margin-bottom:0px");
                        dropzone.getMiddle().setAttribute("style","height:0px;margin-bottom:0px");
                        dropzone.getBottom().setAttribute("style","height:0px;margin-bottom:0px");
                        dragNode.getNodeElement().removeAttribute('style');
                        break;
                    }
        
                    //bottom
                    dropzoneTarget = dropzone.getBottom();
                    dropzoneRect = dropzoneTarget.getBoundingClientRect();
                    if (
                        event.clientX < dropzoneRect.x + dropzoneRect.width &&
                        event.clientX > dropzoneRect.x &&
                        event.clientY < dropzoneRect.y + dropzoneRect.height &&
                        event.clientY > dropzoneRect.y &&
                        dropzone != dragNode
                    ) {
                        //obj._option.dragNode를 dropzone으로 옮기기
                        dragNodeElement.style.transform = "";
                        document.getElementById("tempTreeDraggableDiv")?.remove();
                        dragNode.moveNode(dropzone.getIndex());
        
                        dropzone.getTop().setAttribute("style","height:0px;margin-bottom:0px");
                        dropzone.getMiddle().setAttribute("style","height:0px;margin-bottom:0px");
                        dropzone.getBottom().setAttribute("style","height:0px;margin-bottom:0px");
                        dragNode.getNodeElement().removeAttribute('style');
                        break;
                    }

                    document.getElementById("tempTreeDraggableDiv")?.remove();
                    dragNodeElement.style.transform = "";
                    dropzone.getTop().setAttribute("style","height:0px;margin-bottom:0px");
                    dropzone.getMiddle().setAttribute("style","height:0px;margin-bottom:0px");
                    dropzone.getBottom().setAttribute("style","height:0px;margin-bottom:0px");
                    dragNode.getNodeElement().removeAttribute('style');
                }

                dragNode.getMain().classList.remove("tree-move-node")
                
                if(obj._option.dragOpen) obj.expandNode(dragNode.getIndex());
                else obj.collapseNode(dragNode.getIndex());

                if(!!obj._option?.event?.afterDrag) obj._option?.event?.afterDrag(dragNode,event);
            });

            document.addEventListener('touchend', function(event) {
                if(!obj._option.isDragging) return;
                document.querySelector(obj._option.selector).classList.remove("tree-move")
                obj._option.isDragging = false;
                let dragNode = obj._option.dragNode;
                let dragNodeElement = dragNode.getNodeElement();
                
                for (const [key,dropzone] of Object.entries(obj._option.treeNode)) {
                    //top
                    if(dropzone.getIndex()==0) continue;
                    let dropzoneTarget = dropzone.getTop();
                    let dropzoneRect = dropzoneTarget.getBoundingClientRect();
                    if (
                        event.changedTouches[0].clientX < dropzoneRect.x + dropzoneRect.width &&
                        event.changedTouches[0].clientX > dropzoneRect.x &&
                        event.changedTouches[0].clientY < dropzoneRect.y + dropzoneRect.height &&
                        event.changedTouches[0].clientY > dropzoneRect.y &&
                        dropzone != dragNode
                    ) {
                        //obj._option.dragNode를 dropzone으로 옮기기
                        dragNodeElement.style.transform = "";
                        
                        document.getElementById("tempTreeDraggableDiv")?.remove();
        
                        if(!!dropzone.getParentNode())
                            dragNode.moveNode(dropzone.getParentNode().getIndex(),"before",dropzone.getNodeElement());
                        else
                            dragNode.moveNode(-1,"before",dropzone.getNodeElement());
                        
                        dropzone.getTop().setAttribute("style","height:0px;margin-bottom:0px");
                        dropzone.getMiddle().setAttribute("style","height:0px;margin-bottom:0px");
                        dropzone.getBottom().setAttribute("style","height:0px;margin-bottom:0px");
                        dragNode.getNodeElement().removeAttribute('style');
                        break;
                    }
                    
                    //middle
                    dropzoneTarget = dropzone.getMiddle();
                    dropzoneRect = dropzoneTarget.getBoundingClientRect();
                    
                    if (
                        event.changedTouches[0].clientX < dropzoneRect.x + dropzoneRect.width &&
                        event.changedTouches[0].clientX > dropzoneRect.x &&
                        event.changedTouches[0].clientY < dropzoneRect.y + dropzoneRect.height &&
                        event.changedTouches[0].clientY > dropzoneRect.y &&
                        dropzone != dragNode
                    ) {
                        //obj._option.dragNode를 dropzone으로 옮기기
                        dragNodeElement.style.transform = "";
                        document.getElementById("tempTreeDraggableDiv")?.remove();
                        dragNode.moveNode(dropzone.getParentNode().getIndex(),"after",dropzone.getNodeElement());
        
                        dropzone.getTop().setAttribute("style","height:0px;margin-bottom:0px");
                        dropzone.getMiddle().setAttribute("style","height:0px;margin-bottom:0px");
                        dropzone.getBottom().setAttribute("style","height:0px;margin-bottom:0px");
                        dragNode.getNodeElement().removeAttribute('style');
                        break;
                    }
        
                    //bottom
                    dropzoneTarget = dropzone.getBottom();
                    dropzoneRect = dropzoneTarget.getBoundingClientRect();
                    
                    if (
                        event.changedTouches[0].clientX < dropzoneRect.x + dropzoneRect.width &&
                        event.changedTouches[0].clientX > dropzoneRect.x &&
                        event.changedTouches[0].clientY < dropzoneRect.y + dropzoneRect.height &&
                        event.changedTouches[0].clientY > dropzoneRect.y &&
                        dropzone != dragNode
                    ) {
                        //obj._option.dragNode를 dropzone으로 옮기기
                        dragNodeElement.style.transform = "";
                        document.getElementById("tempTreeDraggableDiv")?.remove();
                        dragNode.moveNode(dropzone.getIndex());
        
                        dropzone.getTop().setAttribute("style","height:0px;margin-bottom:0px");
                        dropzone.getMiddle().setAttribute("style","height:0px;margin-bottom:0px");
                        dropzone.getBottom().setAttribute("style","height:0px;margin-bottom:0px");
                        dragNode.getNodeElement().removeAttribute('style');
                        break;
                    }

                    document.getElementById("tempTreeDraggableDiv")?.remove();
                    dragNodeElement.style.transform = "";
                    dropzone.getTop().setAttribute("style","height:0px;margin-bottom:0px");
                    dropzone.getMiddle().setAttribute("style","height:0px;margin-bottom:0px");
                    dropzone.getBottom().setAttribute("style","height:0px;margin-bottom:0px");
                    dragNode.getNodeElement().removeAttribute('style');
                }
                
                if(obj._option.dragOpen) obj.expandNode(dragNode.getIndex());
                else obj.collapseNode(dragNode.getIndex());

                dragNode.getMain().classList.remove("tree-move-node")

                if(!!obj._option?.event?.afterDrag) obj._option?.event?.afterDrag(dragNode,event);
            });
        }

        
    }

    
}

HjsTree.prototype.initOption = function(option){
    for(let [key,value] of Object.entries(option)){
        this._option[key] = value;
    }
    //필수로 들어가야하는 option들 안 들어오면 default값 세팅
    if(!!!this._option.selector){
        console.error("no tree selector");
        return;
    }

    if(!!!this._option.idColumn){
        console.error("no tree idColumn");
        return;
    }

    if(!!!this._option.upIdColumn){
        console.error("no tree upIdColumn");
        return;
    }

    if(!!!this._option.rootName) this._option.rootName = "tree-root";

    if(!!!this._option.orderColumn) this._option.orderColumn = "TREE_ORDER";

    if(!!!this._option.labelColumn){
        console.error("no tree labelColumn");
        return;
    }

    if(!!!this._option.defaultNodeId) this._option.defaultNodeId = "treenode";

    if(!!!this._option.treeData){
        console.error("no tree treeData");
        return;
    }else{
        this.initData();
    }

    if(!!!this._option.checkbox) this._option.checkbox = null;

    if(!!!this._option.checkboxColumn) this._option.checkboxColumn = null;
    
    if(!!!this._option.checkTrueValue) this._option.checkboxColumn = null;   

    if(!!!this._option.checkFalseValue) this._option.checkboxColumn = null;
    
    if(!!!this._option.checkEvent) this._option.checkEvent = null; 

    if(!!!this._option.leftBtn) this._option.leftBtn = [];

    if(!!!this._option.rightBtn) this._option.rightBtn = [];

    if(!!!this._option.dataset) this._option.dataset = null;

    if(!!!this._option.editable) this._option.editable = false;

    if(!!!this._option.draggable) this._option.draggable = false;

    if(!!!this._option.selectable) this._option.selectable = false;

    if(!!!this._option.contextMenu) this._option.contextMenu = false;

    if(!!!this._option.toggleHandle) this._option.toggleHandle = "left";
    
    this._option.isDragging = false;
    this._option.originalX;
    this._option.originalY;
    this._option.offsetX = 0;
    this._option.offsetY = 0;
    this._option.prevDragElement = null;
    this._option.dragNode = null;
    this._option.dragOpen = false;
    this._option.dragNodeInfo;

    if(!!!this._option.dataLoad) this._option.dataLoad = "all";
    else if(this._option.dataLoad == "partition"){
        if(!!!this._option.submitInfo){
            console.error("no tree submitInfo");
            return;
        }
    }else if(this._option.dataLoad != "all"){
        console.error("wrong tree dataLoad");
        return;
    }

    this._option.treeNode = {}
}

HjsTree.prototype._removeDom = function(element){
    while(element?.firstChild){
        element.removeChild(element.lastChild);
    }
}

HjsTree.prototype.getData = function(){
    let dataArr = new Array();

    for(let [index,node] of Object.entries(this._option.treeNode)){
        if(node.getIndex()==0) continue;
        if(node.getFlag()!="N"){
            let data = node.getData();
            let treeOrder = 0;
            let childNodeList = node.getParentNode().getChildNode();
            for(let idx=0;idx<childNodeList.length;idx++){
                if(childNodeList[idx] == node) break;
                treeOrder++;
            }
            data[this._option.orderColumn] = treeOrder;
            dataArr.push(data);
        }
    }

    return dataArr;
}

HjsTree.prototype.getModifiedData = function(){
    if(!!!this._option.treeNode) return [];
    return this.getData().filter(data=>{return (data.IUDFLAG === "I" || data.IUDFLAG === "U" || data.IUDFLAG === "D")});
}

HjsTree.prototype.initData = function(){
    this._option.treeOrgData = this._option.treeData;

    for(let idx=0;idx<this._option.treeData.length;idx++){
        this._option.treeData[idx]["_orgIndex"] = idx;
        this._option.treeData[idx]["IUDFLAG"] = "";
    }
}

HjsTree.prototype.getIdColumn = function(){
    return this._option.idColumn;
}

HjsTree.prototype.getUpIdColumn = function(){
    return this._option.upIdColumn;
}

HjsTree.prototype.getLabelColumn = function(){
    return this._option.labelColumn;
}

HjsTree.prototype.setTreeNode = function(){
    let tempData = {}
    tempData[this.getUpIdColumn()] = "tree-up-root";
    tempData[this.getIdColumn()] = this._option.rootName;
    let labelColumn = this.getLabelColumn();
    if(typeof(labelColumn) == "object"){
        for(let [col] of labelColumn){
            tempData[col] = "";
        }
    }else{
        tempData[labelColumn] = "";
    }
    
    tempData["IUDFLAG"] = "N";

    let newNode = new HjsTreeNode(0,this,tempData);
    this._option.treeNode[0] = newNode;
    let upNode = this._getUpNode(newNode.getIndex())

    if(!!upNode){
        upNode.setChildNode(newNode);
        newNode.setParentNode(upNode);
    }

    for(let [index,data] of this._option.treeData.entries()){
        let newNode = new HjsTreeNode(index+1,this,data);
        this._option.treeNode[index+1] = newNode;
        let upNode = this._getUpNode(newNode.getIndex())

        if(!!upNode){
            upNode.setChildNode(newNode);
            newNode.setParentNode(upNode);
        }else{
            upNode = this.getNode(0);
            upNode.setChildNode(newNode);
            newNode.setParentNode(upNode);
        }
    }
}

HjsTree.prototype.renderTree = function(){
    let targets = document.querySelectorAll(this._option.selector);
    
    for(let [index,node] of Object.entries(this._option.treeNode)){
        let treeNode = this._option.treeNode[index];
        if(treeNode.getFlag() == "D") continue;
        treeNode.calcDepth(true);
        treeNode.createNode();
        if(!!treeNode.parentNode){
            let pNode = this.getUpNode(index);
            let pNodeSub = pNode.getSub();
            pNodeSub.append(treeNode.getNodeElement())
            pNode.setSub(pNodeSub);
            document.querySelectorAll(this._option.selector+" #"+pNode.getNodeId()+">.tree-node-sub").forEach(item=>{
                item.append(treeNode.getNodeElement());
            })
        }else{
            for(let target of targets){
                this._removeDom(target);
                target.style.position = "relative";
                target.append(treeNode.getNodeElement());
            }
        }
    }
}

HjsTree.prototype.getIndexById = function(id,upId){
    for(let [key,node] of Object.entries(this._option.treeNode)){
        if(node.getIndex()==0) continue;
        let idVal = node.getData()[this._option.idColumn];
        let upIdVal = node.getData()[this._option.upIdColumn];

        if(idVal == id && upIdVal == upId){
            return key;
        }
    }
    return;
}

HjsTree.prototype.getIndexByNode = function(node){
    return node.getIndex();
}

HjsTree.prototype.getIndexByElement = function(element){
    let temp = element;
    while(temp.parentNode!=null){
        if(temp.classList.contains("tree-node-container")) break;
        temp = temp.parentNode;
    }
    if(temp.classList.contains("tree-node-container")){
        let splitId = temp.id.split("_")
        return splitId[splitId.length-1];
    }
    return;
}

HjsTree.prototype.getId= function(index){
    return this._option.treeNode[index].getData()[this._option.idColumn];
}

HjsTree.prototype.getUpId= function(index){
    return this._option.treeNode[index].getData()[this._option.upIdColumn];
}

HjsTree.prototype.getNode = function(index){
    return this._option.treeNode[index];
}

HjsTree.prototype.getModifiedNode = function(index){
    const mArr = Object.entries(this._option.treeNode).filter(node=>{return ["I","U","D"].includes(node[1].getFlag())});
    const rArr = new Array();

    for (let i = 0; i < mArr.length; i++) {
        rArr.push(mArr[i][1]);
    }
    return rArr;
}

HjsTree.prototype.getNodeByDepth = function(depth){
    let nodeArr = [];

    for(let [idx,value] of Object.entries(leftMenuTree._option.treeNode)){
        let tempNode = this._option.treeNode[idx];
        
        if(tempNode.getDepth() == depth) nodeArr.push(tempNode);
    }
    return nodeArr;
}

HjsTree.prototype._getUpNode = function(index){
    let id = this.getId(index);
    let upId = this.getUpId(index);

    let findFlag = -1;

    for(let idx=index;idx>=0;idx--){
        let gid = this.getId(idx) 
        if(gid === upId){
            findFlag = idx;
            break;
        }
    }

    if(findFlag == -1) return null;

    return this._option.treeNode[findFlag];
}

HjsTree.prototype.getUpNode = function(index){
    let node = this.getNode(index);
    return node.getParentNode();
}

HjsTree.prototype.expandNode = function(index){
    return this._option.treeNode[index].expandNode();
}

HjsTree.prototype.expandNodeAll = function(){
    for(let [key,node] of Object.entries(this._option.treeNode)){
        if(node.getIndex()==0) continue;
        node.expandNode();
    }
}

HjsTree.prototype.collapseNode = function(index){
    return this._option.treeNode[index].collapseNode();
}

HjsTree.prototype.collapseNodeAll = function(){
    for(let [key,node] of Object.entries(this._option.treeNode)){
        if(node.getIndex()==0) continue;
        node.collapseNode();
    }
}

HjsTree.prototype.getNodeValue = function(index,col){
    return this._option.treeNode[index].getNodeValue(col);
}

HjsTree.prototype.setNodeValue = function(index,col,value){
    return this._option.treeNode[index].setNodeValue(col,value);
}

HjsTree.prototype.selectNode = function(index,ctrlFlag = false, dataFlag=true){
    if(this._option.selectable === true){
        for(let [key,node] of Object.entries(this._option.treeNode)){
            if(node.getIndex()==0) continue;
            if(key == index){
                node.selectNode(true);
            }
            else {
                if(!ctrlFlag) node.selectNode(false);
            }
        }
    }
    
    this.openNode(index);
}

HjsTree.prototype.unSelectNodeAll = function(){
    for(let [key,node] of Object.entries(this._option.treeNode)){
        if(node.getIndex()==0) continue;
        if(node.isSelect) node.selectNode(false);
    }
    return;
}

HjsTree.prototype.openNode = function(index){
    let node = this.getNode(index);
    let temp = node;
    while(temp.parentNode!=null){
        temp = temp.parentNode;
        temp.expandNode();
    }
}

HjsTree.prototype.openNodeByDepth = function(depth){
    for(let [index,node] of Object.entries(this._option.treeNode)){
        if(node.getDepth()<depth) node.expandNode();
        else node.collapseNode();
    }
}

HjsTree.prototype.searchNode = function(col,value,includeFlag=true,selectFlag=true,openFlag=true){
    let arr = new Array();
    let searchCnt = 0;

    this.unSelectNodeAll();

    for(let [index,node] of Object.entries(this._option.treeNode)){
        if(node.getIndex()==0) continue;
        if(includeFlag){
            if(!!value && node.getNodeValue(col).toString().includes(value)){
                if(selectFlag) this.selectNode(index,searchCnt===0?false:true);
                if(openFlag) this.openNode(index);
                arr.push(node);
                searchCnt++;
            }
        }else{
            if(!!value && node.getNodeValue(col) == value){
                if(selectFlag) this.selectNode(index,searchCnt===0?false:true);
                if(openFlag) this.openNode(index);
                arr.push(node);
                searchCnt++;
            }
        }
    }

    if(searchCnt === 0) this.selectNode(1);
    return arr;
}

HjsTree.prototype.getSelectedNode = function(){
    for(let [key,node] of Object.entries(this._option.treeNode)){
        if(node.getIndex()==0) continue;
        if(node.isSelect) return node;
    }
    return;
}

HjsTree.prototype.getSelectedNodes = function(){
    let array = new Array();
    for(let [key,node] of Object.entries(this._option.treeNode)){
        if(node.getIndex()==0) continue;
        if(node.isSelect) array.push(node);
    }

    return array;
}

HjsTree.prototype.getDepth = function(){
    let depth = 0;
    for(let [key,node] of Object.entries(this._option.treeNode)){
        if(node.getIndex()==0) continue;
        if(depth<node.getDepth() && node.getFlag()!="D") depth = node.getDepth();
    }
    return depth;
}

HjsTree.prototype.addNode = function(index, data){
    let node = this.getNode(index);
    return node.addNode(data);
}

HjsTree.prototype.removeNode = function(index){
    let node = this.getNode(index);
    node.removeNode();
}

HjsTree.prototype.moveNode = function(index,tIndex,flag,std){
    let node = this.getNode(index);
    node.moveNode(tIndex, flag, std);
}

HjsTree.prototype.getEditable = function(){
    return this._option.editable;
}

HjsTree.prototype.getSelectable = function(){
    return this._option.selectable;
}

HjsTree.prototype.getDraggable = function(){
    return this._option.draggable;
}

HjsTree.prototype.getDefaultNodeId = function(){
    return this._option.defaultNodeId;
}

HjsTree.prototype.setEditable = function(editable){
    this._option.editable = editable;
    this.renderTree();
}

HjsTree.prototype.setSelectable = function(selectable){
    this._option.selectable = selectable;
    this.renderTree();
}

HjsTree.prototype.setDraggable = function(draggable){
    this._option.draggable = draggable;
    this.renderTree();
}

HjsTree.prototype.setCheckbox = function(checkbox){
    this._option.checkbox = checkbox;
    this.renderTree();
}

HjsTree.prototype.setDefaultNodeId = function(defaultNodeId){
    this._option.defaultNodeId = defaultNodeId;
    this.renderTree();
}

HjsTree.prototype.setDataset = function(dataset){
    this._option.dataset = dataset;
    this.renderTree();
}

HjsTree.prototype.addLabelColumn = function(labelColumn){
    if(typeof(this._option.labelColumn) == "object") this._option.labelColumn.push(labelColumn);
    else{
        let temp = this._option.labelColumn;
        this._option.labelColumn = new Array();
        if(!!temp) this._option.labelColumn.push(temp);
        this._option.labelColumn.push(labelColumn);
    }
    this.renderTree();
}

HjsTree.prototype.removeLabelColumn = function(labelColumn){
    if(typeof(this._option.labelColumn) == "object"){
        for(let idx=this._option.labelColumn.length-1;idx>=0;idx--){
            if(this._option.labelColumn[idx] == labelColumn){
                this._option.labelColumn.splice(idx,1);
            }
        }
    }
    else{
        this._option.labelColumn = "";
    }
    
    this.renderTree();
}

HjsTree.prototype.addRightBtn = function(rightBtn){
    this._option.rightBtn.push(rightBtn);
    this.renderTree();
}

HjsTree.prototype.removeRightBtn = function(num){
    this._option.rightBtn.splice(num,1);
    this.renderTree();
}

HjsTree.prototype.addLeftBtn = function(leftBtn){
    this._option.leftBtn.push(leftBtn);
    this.renderTree();
}

HjsTree.prototype.removeLeftBtn = function(num){
    this._option.leftBtn.splice(num,1);
    this.renderTree();
}

HjsTree.prototype.hasChild = function(index){
    let node = this.getNode(index);
    return node.hasChild();
}

HjsTree.prototype.checkNode = function(index,type){
    let node = this.getNode(index);
    if(type=="left" || type == "both"){
        let leftChk = node.getNodeElement().querySelector(".tree-node-main-left-lChk");
        leftChk.checked = true;
        node.checkNode(leftChk);
    }
    
    if(type=="right" || type == "both"){
        let rightChk = node.getNodeElement().querySelector(".tree-node-main-left-rChk");
        rightChk.checked = true;
        node.checkNode(rightChk);
    }
}

HjsTree.prototype.unCheckNode = function(index,type){
    let node = this.getNode(index);
    if(type=="left" || type == "both"){
        let leftChk = node.getNodeElement().querySelector(".tree-node-main-left-lChk");
        leftChk.checked = false;
        node.checkNode(leftChk);
    }
    
    if(type=="right" || type == "both"){
        let rightChk = node.getNodeElement().querySelector(".tree-node-main-left-rChk");
        rightChk.checked = false;
        node.checkNode(rightChk);
    }
}

HjsTree.prototype.toggleCheckNode = function(index,type){
    let node = this.getNode(index);
    if(type=="left" || type == "both"){
        let leftChk = node.getNodeElement().querySelector(".tree-node-main-left-lChk");
        leftChk.checked = !leftChk.checked;
        node.checkNode(leftChk);
    }
    
    if(type=="right" || type == "both"){
        let rightChk = node.getNodeElement().querySelector(".tree-node-main-left-rChk");
        rightChk.checked = !rightChk.checked;
        node.checkNode(rightChk);
    }
}

HjsTree.prototype.getCheckedNode = function(type){
    let arr = new Array();
    let obj = this;
    if(type=="left"){
        document.querySelectorAll(".tree-node-main-left-lChk").forEach(item=>{
            if(item.checked) arr.push(obj.getNode(obj.getIndexByElement(item)))
        })
        return arr;
    }
    
    if(type=="right"){
        document.querySelectorAll(".tree-node-main-left-rChk").forEach(item=>{
            if(item.checked) arr.push(obj.getNode(obj.getIndexByElement(item)))
        })
        return arr;
    }
}

HjsTree.prototype._deepCopy = function(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (typeof obj === 'object' && 'structuredClone' in window) {
        return structuredClone(obj);
    }

    if (Array.isArray(obj)) {
        const newArray = [];
        for (let i = 0; i < obj.length; i++) {
            newArray[i] = fastDeepCopy(obj[i]);
        }
        return newArray;
    }

    if (typeof obj === 'object') {
        const newObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key] = fastDeepCopy(obj[key]);
            }
        }
        return newObj;
    }
}

/******************************************************************************************/

function HjsTreeNode(index,tree,data){
    if(!new.target){
		return new HjsTreeNode();
	}

    this.tree = tree;

    this.nodeId = null;

    this.node = null;

    this.top = null;

    this.main = null;

    this.mainLeft = null;
    this.mainMiddle = null;
    this.mainRight = null;

    this.middle = null;

    this.sub = null;

    this.bottom = null;

    this.index = index;
    this.data = this.tree._deepCopy(data);
    this.orgData = this.tree._deepCopy(data);;

    this.parentNode = null;

    this.isSelect = false;
    this.isEdit = false;

    this.childNode = [];
}

HjsTreeNode.prototype.getNodeId = function(){
    return this.nodeId;
}

HjsTreeNode.prototype.getIndex = function(){
    return this.index;
}

HjsTreeNode.prototype.getUpIndex = function(){
    return this.parentNode.getIndex();
}

HjsTreeNode.prototype.getFlag = function(){
    return this.data["IUDFLAG"];
}

HjsTreeNode.prototype.getNodeElement = function(){
    let node = this.node;
    if(this.tree._option.draggable) node.append(this.getTop());
    node.append(this.getMainElement());
    if(this.tree._option.draggable){
        node.append(this.getMiddle());
        node.append(this.getBottom());
    }
    node.append(this.getSub());
    return node;
}

HjsTreeNode.prototype.getTop = function(){
    return this.top;
}

HjsTreeNode.prototype.getMainElement = function(){
    let node = this.getMain();
    node.append(this.getMainLeft());
    node.append(this.getMainMiddle());
    node.append(this.getMainRight());
    return node;
}

HjsTreeNode.prototype.getMain = function(){
    return this.main;
}

HjsTreeNode.prototype.getMainLeft = function(){
    return this.mainLeft;
}

HjsTreeNode.prototype.getMainMiddle = function(){
    return this.mainMiddle;
}

HjsTreeNode.prototype.getMainRight = function(){
    return this.mainRight;
}

HjsTreeNode.prototype.getMiddle = function(){
    return this.middle;
}

HjsTreeNode.prototype.getSub = function(){
    return this.sub;
}

HjsTreeNode.prototype.getBottom = function(){
    return this.bottom;
}

HjsTreeNode.prototype.getParentNode = function(){
    return this.parentNode;
}

HjsTreeNode.prototype.getChildNode = function(){
    return this.childNode;
}

HjsTreeNode.prototype.getDepth = function(){
    return this.depth;
}

HjsTreeNode.prototype.getData = function(){
    return this.data;
}

HjsTreeNode.prototype.setIndex = function(index){
    this.index = index;
}

HjsTreeNode.prototype.setNode = function(node){
    this.node = node;
}

HjsTreeNode.prototype.setTop = function(top){
    this.top = top;
}

HjsTreeNode.prototype.setMain = function(main){
    this.main = main;
}

HjsTreeNode.prototype.setMainLeft = function(mainLeft){
    this.mainLeft = mainLeft;
}

HjsTreeNode.prototype.setMainMiddle = function(mainMiddle){
    this.mainMiddle = mainMiddle;
}

HjsTreeNode.prototype.setMainRight = function(mainRight){
    this.mainRight = mainRight;
}

HjsTreeNode.prototype.setMiddle = function(middle){
    this.middle = middle;
}

HjsTreeNode.prototype.setSub = function(sub){
    this.sub = sub;
}

HjsTreeNode.prototype.setBottom = function(bottom){
    this.bottom = bottom;
}

HjsTreeNode.prototype.setParentNode = function(parent){
    this.parentNode = parent;
}

HjsTreeNode.prototype.setChildNode = function(child){
    let equalFlag = false;
    for(let idx=0;idx<this.childNode.length;idx++){
        if(this.childNode[idx] == child) equalFlag = true;
    }
    if(!equalFlag) this.childNode.push(child);
}

HjsTreeNode.prototype.sortChild = function(){
    let sub = this.getSub();
    let childElement = sub.querySelectorAll(".tree-node-container");
    let tempNode = [];
    for(let idx=0;idx<childElement.length;idx++){
        let id = childElement[idx].id;

        for(let idx2=0;idx2<this.getChildNode().length;idx2++){
            if(this.getChildNode()[idx2].getNodeId() == id){
                tempNode.push(this.getChildNode()[idx2]);
                this.removeChild(this.getChildNode()[idx2]);
            }
        }
    }

    for(let node of tempNode){
        this.setChildNode(node);
    }
}

HjsTreeNode.prototype.removeChild = function(child){
    for(let idx=0;idx<this.childNode.length;idx++){
        if(this.childNode[idx] == child){
            this.childNode.splice(idx,1);
            return 0;
        }
    }
    return -1;
}

HjsTreeNode.prototype.hasChild = function(){
    if(this.getChildNode().length>0) return true;
    else return false;
}

HjsTreeNode.prototype.isOpen = function(){
    if(this.tree._option.toggleHandle === "left"){
        let mainLeft = this.getMainLeft();
        let openNode = mainLeft.querySelector(".tree-node-main-left-toggle.open-node");

        if(!!openNode) return true;
        else return false;
    }else{
        let mainRight = this.getMainRight();
        let openNode = mainRight.querySelector(".tree-node-main-right-toggle.open-node");

        if(!!openNode) return true;
        else return false;
    }
}

HjsTreeNode.prototype.setDepth = function(depth){
    this.depth = depth;
}

HjsTreeNode.prototype._setValueToField = function(dsName,json){
    for(let [key,value] of Object.entries(json)){
        if(value!=null && value!=undefined){
            value = xssDecode(value)
            let radioArr = document.querySelectorAll('input[type="radio"][name="'+dsName+'_'+key+'"]');
            let checkArr = document.querySelectorAll('input[type="checkbox"][name="'+dsName+'_'+key+'"]');
            
            if(radioArr.length > 0){
                if(!!document.querySelector('input[type="radio"][name="'+dsName+'_'+key+'"][value="'+value+'"]'))
                    document.querySelector('input[type="radio"][name="'+dsName+'_'+key+'"][value="'+value+'"]').checked = true;
                else{
                    document.querySelectorAll('input[type="radio"][name="'+dsName+'_'+key+'"]').forEach(item=>{
                        item.checked = false;
                    })
                }
            }else if(checkArr.length>0){
                document.querySelector('input[type="checkbox"][name="'+dsName+'_'+key+'"][value="'+value+'"]').checked = true;
            }else{
                if(!!document.querySelector('[name="'+dsName+'_'+key+'"]'))
                document.querySelector('[name="'+dsName+'_'+key+'"]').value = value;
            }
        }
    }
}

HjsTreeNode.prototype.resetData = function(){
    this.data = this.tree._deepCopy(this.orgData);
    this.reRender();
}

HjsTreeNode.prototype.getNodeValue = function(colNm){
    return xssDecode(this.data[colNm]);
}

HjsTreeNode.prototype.setNodeValue = function(colNm,value,moveNodeFlag=true){
    if(this.tree.getIdColumn() == colNm){
        let upId = this.data[this.tree.getUpIdColumn()];
        let index = this.tree.getIndexById(value,upId);
        let node = this.tree.getNode(index);
        if(!!node){
            alert("중복된 정보로는 수정할 수 없습니다.");
            return -1;
        }

        if(upId == value || !!!value){
            alert("트리 구조에 맞지 않는 데이터로는 변경할 수 없습니다.");
            return -2;
        }
    }

    let target,bValue;

    if(this.tree.getUpIdColumn() == colNm){
        let id = this.data[this.tree.getIdColumn()];
        bValue = this.data[this.tree.getUpIdColumn()];
        let index = this.tree.getIndexById(id,value);
        let node = this.tree.getNode(index);
        if(!!node){
            alert("중복된 정보로는 수정할 수 없습니다.");
            return -1;
        }
        
        if(id == value || !!!value){
            alert("트리 구조에 맞지 않는 데이터로는 변경할 수 없습니다.");
            return -2;
        }

        let equalFlag = 0;

        for(let [key,node] of Object.entries(this.tree._option.treeNode)){
            let tempId = node.getNodeValue(this.tree.getIdColumn());
            let tempUpId = node.getNodeValue(this.tree.getIdColumn());

            if(tempId == value){
                equalFlag++;
                target = node;
            }
        }

        let iudflag = target.data["IUDFLAG"];

        if(iudflag == "D"){
            alert("삭제된 노드를 부모 노드로 가질 수 없습니다.");
            return -3;
        }

        if(equalFlag != 1){
            alert("트리 구조에 맞지 않는 데이터로는 변경할 수 없습니다.");
            return -2;
        }
    }

    let chgFlag = false;
    let chgFlag2 = false;
    let bVal,aVal;
    if(this.data[colNm] != value) chgFlag2 = true;
    if(this.data[colNm] != value && colNm != "IUDFLAG" && (this.data[colNm]!==undefined && this.data[colNm]!==null)){
        chgFlag = true;
        bVal = this.data[colNm];
        aVal = value;
        if(this.data["IUDFLAG"] != "I" && this.data["IUDFLAG"] != "D")
        this.tree.setNodeValue(this.getIndex(),"IUDFLAG","U");
        this.tree.getNode(this.getIndex()).getMain().classList.add("modified-node");
        if(!!this.tree._option?.event?.beforeChange) this.tree._option?.event?.beforeChange(this,colNm,bVal,aVal);
    }
    
    this.data[colNm] = value;

    if(chgFlag){
        if(!!this.tree._option?.event?.afterChange) this.tree._option?.event?.afterChange(this,colNm,bVal,aVal);
    }

    let labelColumn = this.tree.getLabelColumn();
    if(typeof(labelColumn) == "object"){
        if(this.tree.getLabelColumn().includes(colNm)){
            let nodeMainMiddle = this.getMainMiddle();
            if(!!nodeMainMiddle.querySelector("."+colNm)) nodeMainMiddle.querySelector("."+colNm).innerHTML = value;
    
            this.setMainMiddle(nodeMainMiddle);
        }
    }else{
        if(labelColumn == colNm){
            let nodeMainMiddle = this.getMainMiddle();
            if(!!nodeMainMiddle.querySelector("."+colNm)) nodeMainMiddle.querySelector("."+colNm).innerHTML = value;
    
            this.setMainMiddle(nodeMainMiddle);
        }
    }

    if(this.tree._option.dataset!==undefined && this.tree._option.dataset !== null){
        this._setValueToField(this.tree._option.dataset,this.data);
    }

    if(this.tree.getIdColumn() == colNm){
        for(let idx=0;idx<this.getChildNode().length;idx++){
            this.getChildNode()[idx].setNodeValue(this.tree.getUpIdColumn(),value);
        }
    }

    if(this.tree.getUpIdColumn() == colNm){
        let index = this.tree.getIndexById(target.getNodeValue(this.tree.getIdColumn()),target.getNodeValue(this.tree.getUpIdColumn()));
        if(moveNodeFlag && bValue == value) this.moveNode(index,"first");
    }
    
    if(this.getFlag()!=="D" && this.getFlag()!=="N" && chgFlag2){
        this.reRender();
    }

    return 0;
}

HjsTreeNode.prototype.calcDepth = function(firstYn=false){
    let depthNum = -1;
    let temp = this;
    while(temp.parentNode!=null){
        temp = temp.parentNode;
        depthNum += 1;
    }
    this.depth = depthNum;
    if(!!this.tree._option.depthColumn && !firstYn){
        this.setNodeValue(this.tree._option.depthColumn,depthNum)
    }
}

HjsTreeNode.prototype.calcDepthAll = function(){
    this.calcDepth();
    this.calcDepthChild();
}

HjsTreeNode.prototype.calcDepthChild = function(){
    for(let idx=0;idx<this.childNode.length;idx++){
        this.childNode[idx].calcDepth();
        this.childNode[idx].calcDepthChild();
    }
}

HjsTreeNode.prototype.toggleNode =function(){
    let sub = this.getSub();
    sub.classList.toggle("tree-non-show");
    let main = this.getMainElement();
    main.querySelector(".tree-node-main-"+this.tree._option.toggleHandle+"-toggle")?.classList?.toggle("open-node")
}

HjsTreeNode.prototype.expandNode =function(){
    let sub = this.getSub();
    sub.classList.remove("tree-non-show");
    let main = this.getMainElement();
    main.querySelector(".tree-node-main-"+this.tree._option.toggleHandle+"-toggle")?.classList?.add("open-node")
}

HjsTreeNode.prototype.collapseNode =function(){
    let sub = this.getSub();
    sub.classList.add("tree-non-show");
    let main = this.getMainElement();
    main.querySelector(".tree-node-main-"+this.tree._option.toggleHandle+"-toggle")?.classList?.remove("open-node")
}

HjsTreeNode.prototype.checkNode =function(obj){
    let lFlag = true;
    if(obj.classList.contains("tree-node-main-left-rChk")) lFlag = false;

    let tempCls;
    if(lFlag){
        tempCls = ".tree-node-main-left-lChk"
    }else{
        tempCls = ".tree-node-main-left-rChk"
    }

    let chkCol = this.tree._option.checkboxColumn;
    let tValue = this.tree._option.checkTrueValue;
    let fValue = this.tree._option.checkFalseValue;

    if(!!chkCol){
        if(lFlag){
            if(obj.checked){
                if(typeof chkCol == "object"){
                    if(typeof tValue == "object"){
                        this.setNodeValue(chkCol[0],tValue[0]);
                    }else{
                        this.setNodeValue(chkCol[0],tValue);
                    }
                }else{
                    if(typeof tValue == "object"){
                        this.setNodeValue(chkCol,tValue[0]);
                    }else{
                        this.setNodeValue(chkCol,tValue);
                    }
                }
            }else{
                if(typeof chkCol == "object"){
                    if(typeof fValue == "object"){
                        this.setNodeValue(chkCol[0],fValue[0]);
                    }else{
                        this.setNodeValue(chkCol[0],fValue);
                    }
                }else{
                    if(typeof fValue == "object"){
                        this.setNodeValue(chkCol,fValue[0]);
                    }else{
                        this.setNodeValue(chkCol,fValue);
                    }
                }
            }
        }else{
            if(obj.checked){
                if(typeof chkCol == "object"){
                    if(typeof tValue == "object"){
                        this.setNodeValue(chkCol[1],tValue[1]);
                    }else{
                        this.setNodeValue(chkCol[1],tValue);
                    }
                }else{
                    if(typeof tValue == "object"){
                        this.setNodeValue(chkCol,tValue[1]);
                    }else{
                        this.setNodeValue(chkCol,tValue);
                    }
                }
            }else{
                if(typeof chkCol == "object"){
                    if(typeof fValue == "object"){
                        this.setNodeValue(chkCol[1],fValue[1]);
                    }else{
                        this.setNodeValue(chkCol[1],fValue);
                    }
                }else{
                    if(typeof fValue == "object"){
                        this.setNodeValue(chkCol,fValue[1]);
                    }else{
                        this.setNodeValue(chkCol,fValue);
                    }
                }
            }
        }
    }

    let t = this;
    document.querySelectorAll("#"+this.getNodeId()+" .tree-node-sub "+tempCls).forEach(item=>{
        item.checked = obj.checked;
        let itemNode = t.tree.getNode(t.tree.getIndexByElement(item));

        if(!!chkCol){
            if(lFlag){
                if(obj.checked){
                    if(typeof chkCol == "object"){
                        if(typeof tValue == "object"){
                            itemNode.setNodeValue(chkCol[0],tValue[0]);
                        }else{
                            itemNode.setNodeValue(chkCol[0],tValue);
                        }
                    }else{
                        if(typeof tValue == "object"){
                            itemNode.setNodeValue(chkCol,tValue[0]);
                        }else{
                            itemNode.setNodeValue(chkCol,tValue);
                        }
                    }
                }else{
                    if(typeof chkCol == "object"){
                        if(typeof fValue == "object"){
                            itemNode.setNodeValue(chkCol[0],fValue[0]);
                        }else{
                            itemNode.setNodeValue(chkCol[0],fValue);
                        }
                    }else{
                        if(typeof fValue == "object"){
                            itemNode.setNodeValue(chkCol,fValue[0]);
                        }else{
                            itemNode.setNodeValue(chkCol,fValue);
                        }
                    }
                }
            }else{
                if(obj.checked){
                    if(typeof chkCol == "object"){
                        if(typeof tValue == "object"){
                            itemNode.setNodeValue(chkCol[1],tValue[1]);
                        }else{
                            itemNode.setNodeValue(chkCol[1],tValue);
                        }
                    }else{
                        if(typeof tValue == "object"){
                            itemNode.setNodeValue(chkCol,tValue[1]);
                        }else{
                            itemNode.setNodeValue(chkCol,tValue);
                        }
                    }
                }else{
                    if(typeof chkCol == "object"){
                        if(typeof fValue == "object"){
                            itemNode.setNodeValue(chkCol[1],fValue[1]);
                        }else{
                            itemNode.setNodeValue(chkCol[1],fValue);
                        }
                    }else{
                        if(typeof fValue == "object"){
                            itemNode.setNodeValue(chkCol,fValue[1]);
                        }else{
                            itemNode.setNodeValue(chkCol,fValue);
                        }
                    }
                }
            }
        }

    })
}

HjsTreeNode.prototype.selectNode =function(flag){
    let main = this.getMain();
    if(flag){
        let rFlag = true;
        if(!!this.tree._option?.event?.beforeSelect) rFlag = this.tree._option?.event?.beforeSelect(this);
        if(rFlag === false) return;
        
        main.classList.add("select-node");
        if(!!this.tree._option.dataset){
            this._setValueToField(this.tree._option.dataset,this.data);
        }
        if(!!this.tree._option?.event?.afterSelect) rFlag = this.tree._option?.event?.afterSelect(this);
    }
    else main.classList.remove("select-node");
    this.setMain(main);

    this.isSelect = flag;
}

HjsTreeNode.prototype.addNode =function(data){
    if(this.getFlag()=="D"){
        alert("삭제된 노드에는 추가할 수 없습니다.");
        return;
    }

    let mArr = [];
    for(let [key,value] of Object.entries(this.tree._option.treeNode)){
        if(value.getNodeValue(this.tree._option.idColumn).toString().includes(this.tree._option.defaultNodeId)){
            mArr.push(Number(value.getNodeValue(this.tree._option.idColumn).toString().replace(this.tree._option.defaultNodeId+"_","")));
        }   
    }

    let indexArr = Object.entries(this.tree._option.treeNode)
    let index = Number(indexArr[indexArr.length-1][0])+1
    let indexNm = mArr.length>0?(Math.max(...mArr)??1)+1:(isNaN(index)?0:index);

    let orgId = this.getData()[this.tree._option.idColumn];
    let newData;

    if(!!!data){
        data = this.getData();
        newData = {};
        for(let [key,value] of Object.entries(data)){
            if(key == "IUDFLAG") newData[key] = "I";
            else if(key == this.tree._option.idColumn) newData[key] = new Date().getTime().toString();
            else if(key == this.tree._option.upIdColumn) newData[key] = orgId;
            else newData[key] = "";
        }
        newData[this.tree._option.orderColumn] = this.getSub().children.length;
    }else{
        newData = data;
        newData[this.tree.getIdColumn()] = new Date().getTime().toString();
        newData[this.tree.getUpIdColumn()] = orgId;
        newData["IUDFLAG"] = "I";
    }
    
    let newNode = new HjsTreeNode(index,this.tree,newData);
    
    this.tree._option.treeNode[index] = newNode;

    newNode.setParentNode(this);
    this.setChildNode(newNode);

    newNode.calcDepth(true);
    newNode.createNode();

    let tSub = this.getSub();
    tSub.append(newNode.getNodeElement());
    this.setSub(tSub);

    if(this.tree._option.toggleHandle === "left"){
        let mainLeft = this.getMainLeft();
        let btnFlag = true;
        for(let idx=0;idx<mainLeft.children.length;idx++){
            if(mainLeft.children[idx].classList.contains("tree-node-main-left-toggle")){
                btnFlag = false;
                break;
            }
        }
    
        if(btnFlag && this.tree._option.treeNode[0]!=this){
            let tempBtn = document.createElement("label");
            tempBtn.setAttribute("type","button");
            tempBtn.classList.add("tree-node-main-left-toggle");
            tempBtn.classList.add("open-node");
            
            if(this.tree._option.draggable){
                let handle = mainLeft.querySelector(".tree-node-main-left-handle");
                if(!!handle?.nextSibling) mainLeft.insertBefore(tempBtn,handle.nextSibling);
                else mainLeft.append(tempBtn);
            }else{
                mainLeft.prepend(tempBtn);
            }
            let obj = this;
            tempBtn.addEventListener('click',function(){
                obj.toggleNode();
            });
            this.setMainLeft(mainLeft);
        }
    }else{
        let mainRight = this.getMainRight();
        let btnFlag = true;
        for(let idx=0;idx<mainRight.children.length;idx++){
            if(mainRight.children[idx].classList.contains("tree-node-main-right-toggle")){
                btnFlag = false;
            }
        }
    
        if(btnFlag && this.tree._option.treeNode[0]!=this){
            let tempBtn = document.createElement("label");
            tempBtn.setAttribute("type","button");
            tempBtn.classList.add("tree-node-main-right-toggle");
            tempBtn.classList.add("open-node");
            
            mainRight.prepend(tempBtn);
            let obj = this;
            tempBtn.addEventListener('click',function(){
                obj.toggleNode();
            });
            this.setMainRight(mainRight);
        }
    }
   

    for(let idx=0;idx<this.getChildNode().length;idx++){
        this.getChildNode()[idx].setNodeValue(this.tree._option.orderColumn,idx,false);
    }
    newNode.calcDepth();
    this.tree.selectNode(index);
    return newNode.getIndex();
}

HjsTreeNode.prototype.getSortNum = function(){
    const parent = this.getParentNode();
    let locCnt = 0;
    for(let idx=0;idx<parent.getSub().children.length;idx++){
        if(parent.getSub().children[idx]==this.getNodeElement()) break;
        locCnt++;
    }
    return locCnt;
}

HjsTreeNode.prototype.moveNode = function(index,flag="last",std){
    let parent = this.getParentNode();
    let target = this.tree.getNode(index);
    if(!!!std) std = target;
    let id = target.getNodeValue(this.tree.getIdColumn());

    if(parent!=target){
        let setFlag = this.setNodeValue(this.tree.getUpIdColumn(),id,false);
        if(setFlag!=0) return;
    }

    let locCnt = 0;
    if(target==parent){
        for(let idx=0;idx<parent.getSub().children.length;idx++){
            
            if(parent.getSub().children[idx]==this.getNodeElement()) break;
            locCnt++;
        }
    }

    this.setParentNode(target);
    parent.removeChild(this);
    target.setChildNode(this);
    

    let iudflag = target.getNodeValue("IUDFLAG");

    if(iudflag == "D"){
        alert("삭제된 노드로 이동할 수 없습니다.")
        return -3;
    }

    
    
    this.calcDepthAll();
    

    let tSub = target.getSub();

    if(flag=="last") tSub.append(this.getNodeElement());
    else if(flag == "first") tSub.prepend(this.getNodeElement());
    else if(flag == "before") tSub.insertBefore(this.getNodeElement(),std);
    else if(flag == "after"){
        if(!!std.nextSibling) tSub.insertBefore(this.getNodeElement(),std.nextSibling);
        else tSub.append(this.getNodeElement());
    }

    target.sortChild();

    //target mainLeftButton
    if(target.getIndex()!=0){
        if(this.tree._option.toggleHandle === "left"){
            let mainLeft = target.getMainLeft();
            let btnFlag = true;
            for(let idx=0;idx<mainLeft.children.length;idx++){
                if(mainLeft.children[idx].classList.contains("tree-node-main-left-toggle")){
                    btnFlag = false;
                    break;
                }
            
            }

            if(btnFlag){
                let tempBtn = document.createElement("label");
                tempBtn.setAttribute("type","button");
                tempBtn.classList.add("tree-node-main-left-toggle");
                tempBtn.classList.add("open-node");

                if(this.tree._option.draggable){
                    mainLeft.insertBefore(tempBtn,mainLeft.children[0].nextSibling)
                }else mainLeft.prepend(tempBtn);

                let obj = target;
                tempBtn.addEventListener('click',function(){
                    obj.toggleNode();
                });
                target.setMainLeft(mainLeft);
            }
        }else{
            let mainRight = target.getMainRight();
            let btnFlag = true;
            for(let idx=0;idx<mainRight.children.length;idx++){
                if(mainRight.children[idx].classList.contains("tree-node-main-right-toggle")){
                    btnFlag = false;
                    break;
                }
            
            }

            if(btnFlag){
                let tempBtn = document.createElement("label");
                tempBtn.setAttribute("type","button");
                tempBtn.classList.add("tree-node-main-right-toggle");
                tempBtn.classList.add("open-node");

                mainRight.append(tempBtn);

                let obj = target;
                tempBtn.addEventListener('click',function(){
                    obj.toggleNode();
                });
                target.setMainRight(mainRight);
            }
        }
        
    }
    
    //parent mainLeftButton
    if(parent.getIndex()!=0){
        let sub = parent.getSub();
        let btnFlag = true;
        if(parent.hasChild()) btnFlag = false;

        if(btnFlag){
            if(this.tree._option.toggleHandle === "left"){
                let tempLeft = parent.getMainLeft();
                for(let idx=0;idx<tempLeft.children.length;idx++){
                    if(tempLeft.children[idx].classList.contains("tree-node-main-left-toggle")){
                        tempLeft.children[idx].remove();
                        break;
                    }
                }
            }else{
                let tempRight = parent.getMainRight();
                for(let idx=0;idx<tempRight.children.length;idx++){
                    if(tempRight.children[idx].classList.contains("tree-node-main-right-toggle")){
                        tempRight.children[idx].remove();
                        break;
                    }
                }
            }
        }
    }
    

    let locCnt2 = 0;
    if(target==parent){
        //현재위치
        for(let idx=0;idx<parent.getSub().children.length;idx++){
            
            if(parent.getSub().children[idx]==this.getNodeElement()) break;
            locCnt2++;
        }
    }

    if(locCnt!=locCnt2) {
        for(let idx=0;idx<parent.getChildNode().length;idx++){
            parent.getChildNode()[idx].setNodeValue(this.tree._option.orderColumn,idx,false);
        }
    }else{
        if(target!=parent){
            for(let idx=0;idx<target.getChildNode().length;idx++){
                target.getChildNode()[idx].setNodeValue(this.tree._option.orderColumn,idx,false);
            }

            for(let idx=0;idx<parent.getChildNode().length;idx++){
                parent.getChildNode()[idx].setNodeValue(this.tree._option.orderColumn,idx,false);
            }
        }
    }

    if(!!this.tree._option.dataset){
        this.tree.selectNode(this.getIndex());
    }

    return true;
}

HjsTreeNode.prototype.removeNode = function(){
    let pNodeSub = this.getNodeElement();
    pNodeSub.remove();

    if(this.getFlag() == "I" || this.getFlag() == "N") this.setNodeValue("IUDFLAG","N");
    else this.setNodeValue("IUDFLAG","D");

    
    let pNode = this.parentNode;
    if(!!pNode){
        pNode.removeChild(this);
        if(pNode.getChildNode().length == 0){
            let pMain = pNode.getMainElement();
            pMain?.querySelector(".tree-node-main-"+this.tree._option.toggleHandle+"-toggle")?.remove();
        }
        const childNodesLength = this.getChildNode().length
        for(let idx=childNodesLength-1;idx>=0;idx--){
            this.getChildNode()[idx].removeNode();
        }

        pNode.sortChild();

        for(let idx=0;idx<pNode.getChildNode().length;idx++){
            pNode.getChildNode()[idx].setNodeValue(this.tree._option.orderColumn,idx,false);
        }
    }
}

HjsTreeNode.prototype.createNode = function(rerenderYn=false){
    let option = this.tree._option;
    let nodeContainer = document.createElement("div");
    let nodeId = option.defaultNodeId+"_"+this.index;
    nodeContainer.setAttribute("id",nodeId);
    if(this.getIndex() != 0){
        nodeContainer.classList.add("tree-node-container");
    }

    //node top
    let nodeTop;
    if(this.tree._option.draggable){
        nodeTop = document.createElement("div");
        if(this.getIndex() != 0) nodeTop.classList.add("tree-node-top");
    }
    //node main
    let nodeMain = document.createElement("div");
    if(this.getIndex() != 0){
        nodeMain.classList.add("tree-node-main");
        if(this.getFlag() === "U" || this.getFlag() === "I") nodeMain.classList.add("modified-node");
        
        if(this.isSelect) nodeMain.classList.add("select-node")

        if(!!option.event){
            let clickFlag = false;
            for(let [key,value] of Object.entries(option.event)){
                let obj = this;
                if(key === "click") clickFlag = true;
                if(key!=="beforeSelect" && key!=="afterSelect" && key!=="beforeChange" && key!=="afterChange")
                nodeMain.addEventListener(key,function(e){
                    e.stopPropagation();

                    if(key == "click" && option.selectable && !(e.target.tagName === "INPUT" && e.target.getAttribute("type") === "button")){
                        obj.tree.selectNode(obj.index,e.ctrlKey);
                    }

                    if(key == "click" && !!option.dataset && !(e.target.tagName === "INPUT" && e.target.getAttribute("type") === "button")){
                        obj._setValueToField(option.dataset,obj.data);
                    }

                    value(obj,e);
                })
            }

            if(clickFlag === false){
                let obj = this;
                nodeMain.addEventListener("click",function(e){
                    e.stopPropagation();
                    if(option.selectable && !(e.target.tagName === "INPUT" && e.target.getAttribute("type") === "button")){
                        obj.tree.selectNode(obj.index,e.ctrlKey);
                    }

                    if(!!option.dataset && !(e.target.tagName === "INPUT" && e.target.getAttribute("type") === "button")){
                        obj._setValueToField(option.dataset,obj.data);
                    }
                })
            }
        }else{
            let obj = this;
            nodeMain.addEventListener("click",function(e){
                e.stopPropagation();
                if(option.selectable && !(e.target.tagName === "INPUT" && e.target.getAttribute("type") === "button")){
                    obj.tree.selectNode(obj.index,e.ctrlKey);
                }

                if(!!option.dataset && !(e.target.tagName === "INPUT" && e.target.getAttribute("type") === "button")){
                    obj._setValueToField(option.dataset,obj.data);
                }
            })
        }
    }
    
    let nodeMainLeft = document.createElement("div");
    if(this.getIndex() != 0){
        nodeMainLeft.classList.add("tree-node-main-left");

        if(option.draggable){
            let tempLabel = document.createElement("label");

            let dFlag = true;
            if(!!this.tree._option.dragOption){
                if(this.tree._option.dragOption.maxDepth!==undefined && this.tree._option.dragOption.maxDepth!==null && this.tree._option.dragOption.maxDepth!==""){
                    if(this.tree._option.dragOption.maxDepth < this.getDepth()) dFlag = false;
                }
                
                if(this.tree._option.dragOption.minDepth!==undefined && this.tree._option.dragOption.minDepth!==null && this.tree._option.dragOption.minDepth!==""){
                    if(this.tree._option.dragOption.minDepth > this.getDepth()) dFlag = false;
                }
            }

            if(dFlag){
                tempLabel.classList.add("tree-node-main-left-handle");
                let obj = this;
                tempLabel.addEventListener('mousedown', function(event) {
                    if(!!obj.tree._option?.event?.beforeDrag) obj.tree._option?.event?.beforeDrag(obj,event);
                    document.querySelector(obj.tree._option.selector).classList.add("tree-move")
                    obj.tree._option.dragNode = obj;
                    obj.tree._option.isDragging = true;
                    obj.tree._option.originalX = event.clientX;
                    obj.tree._option.originalY = event.clientY;
                    obj.tree._option.offsetX = 0;
                    obj.tree._option.offsetY = 0;
                    obj.tree._option.dragOpen = obj.isOpen();
                    obj.tree._option.dragNodeInfo = obj.getNodeElement().getBoundingClientRect();
                    
                    if(obj.isOpen()) obj.collapseNode();
                    let tempDiv = obj.getNodeElement().cloneNode(true);
                    tempDiv.id = "tempTreeDraggableDiv"
                    obj.getMain().classList.add("tree-move-node")
                    if(!!obj.getNodeElement().nextSibling) obj.getNodeElement().parentNode.insertBefore(tempDiv,obj.getNodeElement().nextSibling);
                    else obj.getNodeElement().parentNode.append(tempDiv);
                });

                tempLabel.addEventListener('touchstart', function(event) {
                    if(!!obj.tree._option?.event?.beforeDrag) obj.tree._option?.event?.beforeDrag(obj,event);
                    document.querySelector(obj.tree._option.selector).classList.add("tree-move")
                    obj.tree._option.dragNode = obj;
                    obj.tree._option.isDragging = true;
                    obj.tree._option.originalX = event.touches[0].clientX;
                    obj.tree._option.originalY = event.touches[0].clientY;
                    obj.tree._option.offsetX = 0;
                    obj.tree._option.offsetY = 0;
                    obj.tree._option.dragOpen = obj.isOpen();
                    obj.tree._option.dragNodeInfo = obj.getNodeElement().getBoundingClientRect();
                    if(obj.isOpen()) obj.collapseNode();
                    let tempDiv = obj.getNodeElement().cloneNode(true);
                    tempDiv.id = "tempTreeDraggableDiv"
                    obj.getMain().classList.add("tree-move-node")
                    if(!!obj.getNodeElement().nextSibling) obj.getNodeElement().parentNode.insertBefore(tempDiv,obj.getNodeElement().nextSibling);
                    else obj.getNodeElement().parentNode.append(tempDiv);
                });
                nodeMainLeft.append(tempLabel);
            }
        }

        if(this.childNode.length!=0 && option.toggleHandle === "left"){
            let tempBtn = document.createElement("label");
            tempBtn.type = "button";
            tempBtn.classList.add("tree-node-main-left-toggle");
            tempBtn.classList.toggle("open-node");
            let obj = this;
            tempBtn.addEventListener('click',function(e){
                e.stopPropagation();
                obj.toggleNode();
            });
            nodeMainLeft.append(tempBtn);
        }

        if(option.checkbox == "left" || option.checkbox == "both"){
            let check = document.createElement("input");
            check.type = "checkbox";
            check.classList.add("tree-node-main-left-lChk");

            if(!!option.checkboxColumn){
                if(typeof option.checkboxColumn == "object"){
                    if(typeof option.checkTrueValue == "object"){
                        if(this.getNodeValue(option.checkboxColumn[0]) == option.checkTrueValue[0]){
                            check.checked = true;
                        }
                    }else{
                        if(this.getNodeValue(option.checkboxColumn[0]) == option.checkTrueValue){
                            check.checked = true;
                        }
                    }
                    
                    if(typeof option.checkFalseValue == "object"){
                        if(this.getNodeValue(option.checkboxColumn[0]) == option.checkFalseValue[0]){
                            check.checked = false;
                        }
                    }else{
                        if(this.getNodeValue(option.checkboxColumn[0]) == option.checkFalseValue){
                            check.checked = false;
                        }                }
                }else{
                    if(typeof option.checkTrueValue == "object"){
                        if(this.getNodeValue(option.checkboxColumn) == option.checkTrueValue[0]){
                            check.checked = true;
                        }
                        
                    }else{
                        if(this.getNodeValue(option.checkboxColumn) == option.checkTrueValue){
                            check.checked = true;
                        }
                    }
                    
                    if(typeof option.checkFalseValue == "object"){
                        if(this.getNodeValue(option.checkboxColumn) == option.checkFalseValue[0]){
                            check.checked = false;
                        }
                    }else{
                        if(this.getNodeValue(option.checkboxColumn) == option.checkFalseValue){
                            check.checked = false;
                        }
                    }
                }
            }
            
            let obj = this;
            check.addEventListener('click',function(event){
                obj.checkNode(this);
                if(!!option.checkEvent){
                    if(typeof option.checkEvent == "object"){
                        if(!!option.checkEvent[0]) option.checkEvent[0]();
                    }else{
                        option.checkEvent(check,event);
                    }
                }
            });
            nodeMainLeft.append(check);
        }
        

        for(let idx=0;idx<option.leftBtn.length;idx++){
            let bFlag = true;
            let bcFlag = false;
            let bitFlag = false;
            let bType = "input"
            if(typeof option.leftBtn[idx] === "object" && option.leftBtn[idx].constructor.name === "Object"){
                if(!!option.leftBtn[idx].condition){
                    bFlag = option.leftBtn[idx].condition(this)??true;
                }

                if(option.leftBtn[idx].maxDepth!==undefined && option.leftBtn[idx].maxDepth!==null && option.leftBtn[idx].maxDepth!==""){
                    if(option.leftBtn[idx].maxDepth < this.getDepth()) bFlag = false;
                }
                
                if(option.leftBtn[idx].minDepth!==undefined && option.leftBtn[idx].minDepth!==null && option.leftBtn[idx].minDepth!==""){
                    if(option.leftBtn[idx].minDepth > this.getDepth()) bFlag = false;
                }

                if(!!option.leftBtn[idx].class && option.leftBtn[idx]?.class?.length>0){
                    bcFlag = true;
                }

                if(!!option.leftBtn[idx].innerText){
                    bitFlag = true;
                }

                if(!!option.leftBtn[idx].tagName){
                    bType = option.leftBtn[idx].tagName;
                }
            }
            
            if(bFlag){
                let tempBtn = document.createElement(bType);
                if(bType === "input") tempBtn.type = "button";
                tempBtn.classList.add("tree-node-main-left-child");
                tempBtn.classList.add("tree-node-main-left-child"+idx);

                if(bcFlag){
                    for(let idx2=0;idx2<option.leftBtn[idx]?.class?.length;idx2++){
                        let classNm = option.leftBtn[idx]?.class[idx2];
                        tempBtn.classList.add(classNm);
                    }
                }

                if(bitFlag){
                    if(bType === "input" || bType === "button") tempBtn.value = option.leftBtn[idx].innerText
                    else tempBtn.innerText = option.leftBtn[idx].innerText;
                }
                
                if(typeof option.leftBtn[idx] === "function"){
                    tempBtn.addEventListener('click',e=>{
                        option.leftBtn[idx](e,this);
                    });
                }else{
                    if(!!option.leftBtn[idx].event){
                        for(let [key,value] of Object.entries(option.leftBtn[idx].event)){
                            tempBtn.addEventListener(key,e=>{
                                value(e,this);
                            });
                        }
                    }
                }
                
                nodeMainLeft.append(tempBtn);
            }
        }
    }
    

    let nodeMainMiddle = document.createElement("div");
    if(this.getIndex() != 0){
        nodeMainMiddle.classList.add("tree-node-main-middle");

        let labelLength = 0;
        if(typeof(option.labelColumn)=="object") labelLength = option.labelColumn.length;
        else if(!!option.labelColumn) labelLength = 1;

        for(let idx=0;idx<labelLength;idx++){
            let labelNm = (typeof(option.labelColumn)=="object"?option.labelColumn[idx]:option.labelColumn)
            let eFlag = false;
            let eType = "input";
            let eiType = "text";
            let dFlag = false;
            let lType = "div";
            let lFlag = true;
            if(option.editable){
                eFlag = true;
                if(!!option.editOption){
                    if(!!option.editOption[labelNm]){
                        if(!!option.editOption[labelNm].condition){
                            eFlag = option.editOption[labelNm].condition(this)??true;
                        }
                        if(option.editOption[labelNm].editable === false) eFlag = false;
                        if(!!option.editOption[labelNm].tagName){
                            if(!["text","checkbox","radio","datetime","date"].includes(option.editOption[labelNm].tagName.toLowerCase())) eType = option.editOption[labelNm].tagName;
                            else eiType = option.editOption[labelNm].tagName;
                        }
                        if(option.editOption[labelNm].directEdit === true) dFlag = true;
                    }
                }
            }

            if(!!option.labelOption){
                if(!!option.labelOption[labelNm]){
                    if(!!option.labelOption[labelNm].tagName) lType = option.labelOption[labelNm].tagName

                    if(!!option.labelOption[labelNm]?.condition){
                        lFlag = option.labelOption[labelNm]?.condition(this);
                    }

                    if(option.labelOption[labelNm].maxDepth!==undefined && option.labelOption[labelNm].maxDepth!==null && option.labelOption[labelNm].maxDepth!==""){
                        if(option.labelOption[labelNm].maxDepth < this.getDepth()) lFlag = false;
                    }

                    if(option.labelOption[labelNm].minDepth!==undefined && option.labelOption[labelNm].minDepth!==null && option.labelOption[labelNm].minDepth!==""){
                        if(option.labelOption[labelNm].minDepth > this.getDepth()) lFlag = false;
                    }
                }
            }

            if(lFlag){
                let tDivTag = dFlag && eFlag?eType:lType;
                let tempDiv = document.createElement(tDivTag);
                if(dFlag && eFlag) this.isEdit = true;
                else this.isEdit = false;

                if(tDivTag === "input") tempDiv.type = eiType;
                
                tempDiv.setAttribute('id',nodeId + "_" + idx);
                
                tempDiv.classList.add("tree-node-main-middle-child");
                tempDiv.classList.add("tree-node-main-middle-child"+idx);
                tempDiv.classList.add(labelNm);

                for(let idx2=0;idx2<option?.labelOption?.[labelNm]?.class?.length??0;idx2++){
                    let classNm = option?.labelOption?.[labelNm]?.class[idx2];
                    tempDiv.classList.add(classNm);
                }

                let codeColumn = option?.labelOption?.[labelNm]?.selectCodeColumn??"code";
                let nameColumn = option?.labelOption?.[labelNm]?.selectNameColumn??"name";

                if(!!option?.labelOption?.[labelNm]?.selectData){
                    for(let idx2=0;idx2<option.labelOption[labelNm]?.selectData?.length??0;idx2++){
                        let tempOption = document.createElement("option");
                        tempOption.setAttribute("value",option.labelOption[labelNm]?.selectData[idx2][codeColumn])
                        tempOption.innerText = option.labelOption[labelNm]?.selectData[idx2][nameColumn]
                        tempDiv.append(tempOption)
                    }
                }
                
                let lName = this.getNodeValue(labelNm)
                if(!!option?.labelOption?.[labelNm]?.selectData && tempDiv.tagName !== "SELECT"){
                    let sData = option.labelOption[labelNm]?.selectData;
                    let sfData = sData.filter(obj=>{return obj[codeColumn] === lName})
                    if(sfData.length>0) lName=sfData[0][nameColumn];
                    else lName = "";
                }
                

                if(["INPUT","TEXTAREA","SELECT"].includes(tempDiv.tagName)) tempDiv.value = lName??"";
                else tempDiv.innerText = lName??"";

                if(eFlag){
                    let obj = this;
                    if(option?.editOption?.[labelNm]?.placeholder !== undefined && option?.editOption?.[labelNm]?.placeholder !== null){
                        tempDiv.setAttribute("placeholder",option?.editOption?.[labelNm]?.placeholder);
                    }

                    if(tDivTag === "input" && eiType === "checkbox"){
                        if((option?.editOption?.[labelNm]?.checkedValue??"") === (lName??"")) tempDiv.checked = true;
                        else tempDiv.checked = false;
                    }

                    if(option?.editOption?.[labelNm]?.directEdit===true){
                        tempDiv.addEventListener('change',function(e){ 
                            setTimeout(()=>{
                                let tVal = tempDiv.value
                                if(tDivTag === "input" && eiType === "checkbox"){
                                    if(tempDiv.checked) tVal = option?.editOption?.[labelNm]?.checkedValue??""
                                    else tVal = option?.editOption?.[labelNm]?.unCheckedValue??""
                                }
                                obj.setNodeValue(labelNm,tVal);
                                if(!!option.dataset){
                                    obj._setValueToField(option.dataset,obj.data);
                                }
                                if(!dFlag) obj.isEdit = false;
                            },100)
                            
                        });
                    }else{
                        tempDiv.addEventListener((option?.editOption?.[labelNm]?.directEdit===true)?'mouseover':'click',function(){
                            let codeColumn = option?.editOption?.[labelNm]?.selectCodeColumn??"code";
                            let nameColumn = option?.editOption?.[labelNm]?.selectNameColumn??"name";
                            obj.isEdit = true;
                            let tempLabel = document.createElement(eType);
                            if(eType === "input") tempLabel.setAttribute('type',eiType);
                            tempLabel.classList.add("tree-node-main-middle-child");
                            tempLabel.classList.add("tree-node-main-middle-child"+idx);
    
                            if(eType.toUpperCase() === "SELECT"){
                                for(let idx2=0;idx2<option.editOption[labelNm]?.selectData?.length??0;idx2++){
                                    let tempOption = document.createElement("option");
                                    tempOption.setAttribute("value",option.editOption[labelNm]?.selectData[idx2][codeColumn])
                                    tempOption.innerText = option.editOption[labelNm]?.selectData[idx2][nameColumn]
                                    tempLabel.append(tempOption)
                                }
                            }
    
                            tempLabel.classList.add(labelNm);
                            for(let idx2=0;idx2<option?.editOption?.[labelNm]?.class?.length??0;idx2++){
                                let classNm = option?.editOption?.[labelNm]?.class[idx2];
                                tempLabel.classList.add(classNm);
                            }
    
                            let tdVal = tempDiv.value??tempDiv.innerText??tempDiv.innerHTML??"";
    
                            if(eType.toUpperCase() === "SELECT" && !!option.editOption[labelNm]?.selectData){
                                let sData = option.editOption[labelNm]?.selectData;
                                let sfData = sData.filter(obj=>{return obj[nameColumn] === tdVal})
                                if(sfData.length>0) tdVal=sfData[0][codeColumn];
                            }
    
                            tempLabel.value = tdVal
                            tempLabel.addEventListener('focusout',function(e){ 
                                if(["INPUT","TEXTAREA","SELECT"].includes(tempDiv.tagName)) tempDiv.value = tempLabel.value??""
                                else tempDiv.innerText = (eType.toUpperCase() === "SELECT")?tempLabel.options[tempLabel.selectedIndex]?.text??"":tempLabel.value??""
                                obj.setNodeValue(labelNm,tempLabel.value);
                                tempLabel.parentElement.insertBefore(tempDiv, tempLabel.nextSibling);
                                tempLabel.remove();
                                if(!!option.dataset){
                                    obj._setValueToField(option.dataset,obj.data);
                                }
                                if(!dFlag) obj.isEdit = false;
                            });
    
                            tempDiv.parentElement.insertBefore(tempLabel, tempDiv.nextSibling);
                            tempDiv.remove();
                            if(!!!option?.editOption?.[labelNm] || option?.editOption?.[labelNm]?.directEdit===false) tempLabel.focus();
                        });
                    }
                }

                nodeMainMiddle.append(tempDiv);

                if(eFlag && !!option?.labelOption?.[labelNm]?.suffixLabel){
                    let tempSuffix = document.createElement("label");
                    tempSuffix.innerText = option?.labelOption?.[labelNm]?.suffixLabel??""
                    if(tDivTag === "input" && (eiType === "checkbox" || eiType === "radio")) tempSuffix.setAttribute("for",nodeId + "_" + idx);
                    nodeMainMiddle.append(tempSuffix);
                }
            }
        }
    }

    

    let nodeMainRight = document.createElement("div");
    if(this.getIndex() != 0){
        nodeMainRight.classList.add("tree-node-main-right");

        for(let idx=0;idx<option.rightBtn.length;idx++){
            let bFlag = true;
            let bcFlag = false;
            let bitFlag = false;
            let bType = "input"
            if(typeof option.rightBtn[idx] === "object" && option.rightBtn[idx].constructor.name === "Object"){
                if(!!option.rightBtn[idx].condition){
                    bFlag = option.rightBtn[idx].condition(this)??true;
                }

                if(option.rightBtn[idx].maxDepth!==undefined && option.rightBtn[idx].maxDepth!==null && option.rightBtn[idx].maxDepth!==""){
                    if(option.rightBtn[idx].maxDepth < this.getDepth()) bFlag = false;
                }
                
                if(option.rightBtn[idx].minDepth!==undefined && option.rightBtn[idx].minDepth!==null && option.rightBtn[idx].minDepth!==""){
                    if(option.rightBtn[idx].minDepth > this.getDepth()) bFlag = false;
                }

                if(!!option.rightBtn[idx].class && option.rightBtn[idx]?.class?.length>0){
                    bcFlag = true;
                }

                if(!!option.rightBtn[idx].innerText){
                    bitFlag = true;
                }

                if(!!option.rightBtn[idx].tagName){
                    bType = option.rightBtn[idx].tagName;
                }
            }
            
            if(bFlag){
                let tempBtn = document.createElement(bType);
                if(bType === "input") tempBtn.type = "button";
                tempBtn.classList.add("tree-node-main-right-child");
                tempBtn.classList.add("tree-node-main-right-child"+idx);

                if(bcFlag){
                    for(let idx2=0;idx2<option.rightBtn[idx]?.class?.length;idx2++){
                        let classNm = option.rightBtn[idx]?.class[idx2];
                        tempBtn.classList.add(classNm);
                    }
                }

                if(bitFlag){
                    if(bType === "input" || bType === "button") tempBtn.value = option.rightBtn[idx].innerText
                    else tempBtn.innerText = option.rightBtn[idx].innerText;
                }
                
                if(typeof option.rightBtn[idx] === "function"){
                    tempBtn.addEventListener('click',e=>{
                        e.preventDefault();
                        e.stopPropagation();
                        option.rightBtn[idx](e,this);
                    });
                }else{
                    if(!!option.rightBtn[idx].event){
                        for(let [key,value] of Object.entries(option.rightBtn[idx].event)){
                            tempBtn.addEventListener(key,e=>{
                                e.preventDefault();
                                e.stopPropagation();
                                value(e,this);
                            });
                        }
                    }
                }
                
                nodeMainRight.append(tempBtn);
            }
        }

        if(option.checkbox == "right" || option.checkbox == "both"){
            let check = document.createElement("input");
            check.type = "checkbox";
            check.classList.add("tree-node-main-left-rChk");

            if(!!option.checkboxColumn){
                if(typeof option.checkboxColumn == "object"){
                    if(typeof option.checkTrueValue == "object"){
                        if(this.getNodeValue(option.checkboxColumn[1]) == option.checkTrueValue[1]){
                            check.checked = true;
                        }
                    }else{
                        if(this.getNodeValue(option.checkboxColumn[1]) == option.checkTrueValue){
                            check.checked = true;
                        }
                    }
                    
                    if(typeof option.checkFalseValue == "object"){
                        if(this.getNodeValue(option.checkboxColumn[1]) == option.checkFalseValue[1]){
                            check.checked = false;
                        }
                    }else{
                        if(this.getNodeValue(option.checkboxColumn[1]) == option.checkFalseValue){
                            check.checked = false;
                        }                }
                }else{
                    if(typeof option.checkTrueValue == "object"){
                        if(this.getNodeValue(option.checkboxColumn) == option.checkTrueValue[1]){
                            check.checked = true;
                        }
                        
                    }else{
                        if(this.getNodeValue(option.checkboxColumn) == option.checkTrueValue){
                            check.checked = true;
                        }
                    }
                    
                    if(typeof option.checkFalseValue == "object"){
                        if(this.getNodeValue(option.checkboxColumn) == option.checkFalseValue[1]){
                            check.checked = false;
                        }
                    }else{
                        if(this.getNodeValue(option.checkboxColumn) == option.checkFalseValue){
                            check.checked = false;
                        }
                    }
                }
            }
            let obj = this;
            check.addEventListener('click',function(event){
                obj.checkNode(this);
                if(!!option.checkEvent){
                    if(typeof option.checkEvent == "object"){
                        if(!!option.checkEvent[1]) option.checkEvent[1]();
                    }else{
                        option.checkEvent(check,event);
                    }
                }
            });
            nodeMainRight.append(check);
        }

        if(this.childNode.length!=0 && option.toggleHandle === "right"){
            let tempBtn = document.createElement("label");
            tempBtn.type = "button";
            tempBtn.classList.add("tree-node-main-right-toggle");
            tempBtn.classList.toggle("open-node");
            let obj = this;
            tempBtn.addEventListener('click',function(e){
                e.stopPropagation();
                obj.toggleNode();
            });
            nodeMainRight.append(tempBtn);
        }
    }
    

    //node middle
    let nodeMiddle;
    if(this.tree._option.draggable){
        nodeMiddle = document.createElement("div");
        if(this.getIndex() != 0) nodeMiddle.classList.add("tree-node-middle");
    }
    //node sub
    let nodeSub = document.createElement("div");
    if(this.getIndex() != 0) nodeSub.classList.add("tree-node-sub");

    //node bottom
    let nodeBottom;
    if(this.tree._option.draggable){
        nodeBottom = document.createElement("div");
        if(this.getIndex() != 0) nodeBottom.classList.add("tree-node-bottom");
    }
    if(!rerenderYn){
        this.nodeId = nodeId;

        this.id = new Date().getTime();

        this.node = nodeContainer;

        if(this.tree._option.draggable){
            this.top = nodeTop;
            this.middle = nodeMiddle;
            this.bottom = nodeBottom;
        }
    }
    this.main = nodeMain;

    this.mainLeft = nodeMainLeft;
    this.mainMiddle = nodeMainMiddle;
    this.mainRight = nodeMainRight;

     
    if(!rerenderYn) this.sub = nodeSub;
}

HjsTreeNode.prototype.reRender = function(){
    let bMain = this.main;
    this.createNode(true);
    this.node.insertBefore(this.getMainElement(),bMain);
    bMain.remove();
};

function xssDecode(str){
    if(!!str){
        str = str.toString();
        str = str.replaceAll('&#40;','(');
        str = str.replaceAll('&#41;',')');
        str = str.replaceAll('&#34;','"');
        str = str.replaceAll('&#39;',"'");
        str = str.replaceAll('&#92;',"\\");
        str = str.replaceAll('&#61;&#34;','="');
        str = str.replaceAll('&lt;',"<");
        str = str.replaceAll('&gt;',">");
        str = str.replaceAll('&amp;',"&");
        str = str.replaceAll('&quot;',"\"");
        str = str.replaceAll('\f',"\"");
    }
    return str;
  }