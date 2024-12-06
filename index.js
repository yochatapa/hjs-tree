const checkboxSampleTree = new HjsTree();

checkboxSampleTree.init({
    selector: "#checkbox",
    treeData: sampleData1,
    idColumn: "SN",
    upIdColumn: "UP_SN",
    rootName: "0",
    orderColumn: "ORDER_NO",
    labelColumn: "NAME_COLUMN",
    checkbox: "left",
})

const selectableSampleTree = new HjsTree();

selectableSampleTree.init({
    selector: "#selectable",
    treeData: sampleData1,
    idColumn: "SN",
    upIdColumn: "UP_SN",
    rootName: "0",
    orderColumn: "ORDER_NO",
    labelColumn: "NAME_COLUMN",
    selectable: true,
})

const editableSampleTree = new HjsTree();

editableSampleTree.init({
    selector: "#editable",
    treeData: sampleData1,
    idColumn: "SN",
    upIdColumn: "UP_SN",
    rootName: "0",
    orderColumn: "ORDER_NO",
    labelColumn: "NAME_COLUMN",
    editable: true
})

const draggableSampleTree = new HjsTree();

draggableSampleTree.init({
    selector: "#draggable",
    treeData: sampleData1,
    idColumn: "SN",
    upIdColumn: "UP_SN",
    rootName: "0",
    orderColumn: "ORDER_NO",
    labelColumn: "NAME_COLUMN",
    draggable: true,
})

const datasetSampleTree = new HjsTree();

datasetSampleTree.init({
    selector: "#dataset",
    treeData: sampleData1,
    idColumn: "SN",
    upIdColumn: "UP_SN",
    rootName: "0",
    orderColumn: "ORDER_NO",
    labelColumn: "NAME_COLUMN",
    dataset : "BIND"
})

const btnSampleTree = new HjsTree();

btnSampleTree.init({
    selector: "#btnSample",
    treeData: sampleData1,
    idColumn: "SN",
    upIdColumn: "UP_SN",
    rootName: "0",
    orderColumn: "ORDER_NO",
    labelColumn: "NAME_COLUMN",
    leftBtn : [(e,node)=>alert("left button!")], // 함수만 호출 시, click 이벤트로 동작
    rightBtn : [
        {
            innerText : "click!", // 버튼 안 Text
            maxDepth : 2, // 2이하 depth 까지 표출
            minDepth : 1, // 1이상 depth까지 표출
            event : {
                // click event 호출
                click : (e,node)=>alert(node.getNodeValue("NAME_COLUMN") + " click!")
            }
        }
    ]
})