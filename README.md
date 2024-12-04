# HjsTree 컴포넌트

## 개요

`HjsTree`는 데이터를 트리 구조로 시각화하여 사용자와 상호작용할 수 있도록 제공하는 UI 컴포넌트입니다. 이 컴포넌트는 확장성 및 커스터마이징 옵션이 뛰어난 것이 특징입니다.

## 주요 기능
- **트리 구조 표현**: 계층적 데이터 구조를 직관적으로 시각화 가능.
- **노드 상호작용** : 노드 추가, 삭제, 수정, 드래그 앤 드롭 지원.
- **이벤트 핸들링** : 클릭, 선택, 확장/축소 등 다양한 이벤트를 처리 가능.
- **커스터마이징**  : 사용자 정의 스타일, 아이콘, 노드 렌더링 지원.

## How To Use

1. HjsTree.js를 Import 시킵니다.
```html
<script src="/src/hjsTree.js"></script>
<link rel="stylesheet" type="text/css" href="/src/hjsTree.css"/>
```

2. HjsTree를 선언하고 초기화합니다.
```javascript
// HjsTree를 선언과 동시에 초기화
let tree = new HjsTree({
    selector        : "#group1",
    treeData        : treeData,
    idColumn        : "SN",
    upIdColumn      : "UP_SN",
    labelColumn     : "LABEL_NM",
});
```

```javascript
// HjsTree를 선언 후 초기화시
let tree = new HjsTree();
 
tree.init({
    selector        : "#group1",
    treeData        : treeData,
    idColumn        : "SN",
    upIdColumn      : "UP_SN",
    labelColumn     : "LABEL_NM",
});
```

3. HjsTree의 다양한 메소드들을 활용하여 사용해보세요!


## 구조

HjsTree는 **Tree** 영역과 **Node** 영역으로 구성되어 있습니다.

1. [Tree](./docs/tree/README.md): Tree 영역은 HjsTree의 **속성**과 **Node 정보** 등 트리와 관련된 **전체적인 정보**를 담고 있는 영역입니다.

2. [Node](./docs/node/README.md): Node 영역은 각 Node의 **데이터**, **상태** 등 **개별 Node와 관련된 정보**를 담고 있는 영역입니다.


### 데이터 구조 예시
HjsTree에서 사용하는 데이터는 다음과 같은 형식으로 표현됩니다.

```javascript
let treeData = [{
        "UP_SN"     : 0,
        "SN"        : 1,
        "ORDER_NO"  : 0,
        "LABEL_NM"  : "1",
    },
    {
        "UP_SN"     : 0,
        "SN"        : 2,
        "ORDER_NO"  : 1,
        "LABEL_NM"  : "2",
    },
    {
        "UP_SN"     : 2,
        "SN"        : 3,
        "ORDER_NO"  : 1,
        "LABEL_NM"  : "2-1",
    },
    {
        "UP_SN"     : 2,
        "SN"        : 4,
        "ORDER_NO"  : 2,
        "LABEL_NM"  : "2-2",
    },
]
```

## 속성

HjsTree에는 20개의 속성값이 존재합니다.

각 속성에 대한 설명은 다음 표와 같습니다.


|순번| 속성 이름                                                 | 필수   | 설명                                |
|----|----------------------------------------------------------|--------|------------------------------------|        
|1   | [selector](./docs/props/README.md#selector)              | O      | 선택자를 정의합니다.                 |          
|2   | [treeData](./docs/props/README.md#treeData)              | O      | 트리 데이터를 설정합니다.            |
|3   | [idColumn](./docs/props/README.md#idColumn)              | O      | ID 컬럼 이름을 지정합니다.           |
|4   | [upIdColumn](./docs/props/README.md#upIdColumn)          | O      | 상위 ID 컬럼을 지정합니다.           |
|5   | [labelColumn](./docs/props/README.md#labelColumn)        | O      | 노드의 라벨을 정의합니다.            |
|6   | [rootName](./docs/props/README.md#rootName)              |        | 루트 노드의 이름을 설정합니다.       |    
|7   | [orderColumn](./docs/props/README.md#orderColumn)        |        | 노드 순서를 지정하는 컬럼입니다.     |        
|8   | [defaultNodeId](./docs/props/README.md#defaultNodeId)    |        | 기본 노드 ID를 설정합니다.           |
|9   | [checkbox](./docs/props/README.md#checkbox)              |        | 체크박스를 활성화합니다.             |
|10  | [checkboxColumn](./docs/props/README.md#checkboxColumn)  |        | 체크박스 상태를 설정하는 컬럼입니다. |            
|11  | [checkTrueValue](./docs/props/README.md#checkTrueValue)  |        | 체크박스의 참 값을 정의합니다.       |     
|12  | [checkFalseValue](./docs/props/README.md#checkFalseValue)|        | 체크박스의 거짓 값을 정의합니다.     |     
|13  | [checkEvent](./docs/props/README.md#checkEvent)          |        | 체크박스 이벤트를 설정합니다.        |   
|14  | [leftBtn](./docs/props/README.md#leftBtn)                |        | 왼쪽 버튼 속성을 설정합니다.         |
|15  | [rightBtn](./docs/props/README.md#rightBtn)              |        | 오른쪽 버튼 속성을 설정합니다.       |    
|16  | [dataset](./docs/props/README.md#dataset)                |        | 데이터셋을 정의합니다.               |
|17  | [editable](./docs/props/README.md#editable)              |        | 노드를 바로 편집할 수 있습니다.      |
|18  | [draggable](./docs/props/README.md#draggable)            |        | 노드 드래그를 활성화합니다.          | 
|19  | [selectable](./docs/props/README.md#selectable)          |        | 노드 선택 가능 여부를 설정합니다.    |         
|20  | [event](./docs/props/README.md#event)                    |        | 이벤트 핸들링을 정의합니다.          | 


## 메소드

HjsTree의 메소드는 **Tree 메소드**와 **Node 메소드**로 구분할 수 있습니다.

### Tree 메소드

| **분류**                   | **메소드**                                    | **설명**                                      |
|----------------------------|----------------------------------------------|-----------------------------------------------|
| **초기화 및 속성 관련 메소드** | 1. [init](./docs/tree/Methods.md#init)                           | 트리를 초기화합니다.                           |
|                            | 2. [getIdColumn](./docs/tree/Methods.md#getIdColumn)               | ID 컬럼을 가져옵니다.                          |
|                            | 3. [getUpIdColumn](./docs/tree/Methods.md#getUpIdColumn)           | 부모 ID 컬럼을 가져옵니다.                     |
|                            | 4. [setEditable](./docs/tree/Methods.md#setEditable)               | 트리를 편집 가능하도록 설정합니다.              |
|                            | 5. [setSelectable](./docs/tree/Methods.md#setSelectable)           | 선택 가능 여부를 설정합니다.                   |
|                            | 6. [setDraggable](./docs/tree/Methods.md#setDraggable)             | 드래그 가능 여부를 설정합니다.                 |
|                            | 7. [setCheckbox](./docs/tree/Methods.md#setCheckbox)               | 체크박스 사용 여부를 설정합니다.               |
|                            | 8. [setDefaultNodeId](./docs/tree/Methods.md#setDefaultNodeId)     | 기본 Node ID를 설정합니다.                     |
|                            | 9. [setDataset](./docs/tree/Methods.md#setDataset)                 | 데이터를 설정합니다.                           |
|                            | 10. [addRightBtn](./docs/tree/Methods.md#addRightBtn)             | 오른쪽 버튼을 추가합니다.                      |
|                            | 11. [removeRightBtn](./docs/tree/Methods.md#removeRightBtn)       | 오른쪽 버튼을 제거합니다.                      |
|                            | 12. [addLeftBtn](./docs/tree/Methods.md#addLeftBtn)               | 왼쪽 버튼을 추가합니다.                        |
|                            | 13. [removeLeftBtn](./docs/tree/Methods.md#removeLeftBtn)         | 왼쪽 버튼을 제거합니다.                        |
| **트리 동작 메소드**        | 1. [expandNode](./docs/tree/Methods.md#expandNode)                | 특정 Node를 확장합니다.                        |
|                            | 2. [expandNodeAll](./docs/tree/Methods.md#expandNodeAll)          | 모든 Node를 확장합니다.                        |
|                            | 3. [collapseNode](./docs/tree/Methods.md#collapseNode)            | 특정 Node를 축소합니다.                        |
|                            | 4. [collapseNodeAll](./docs/tree/Methods.md#collapseNodeAll)      | 모든 Node를 축소합니다.                        |
|                            | 5. [openNode](./docs/tree/Methods.md#openNode)                    | 특정 Node를 엽니다.                            |
|                            | 6. [openNodeByDepth](./docs/tree/Methods.md#openNodeByDepth)      | 특정 depth까지 Node를 엽니다.                   |
|                            | 7. [checkNode](./docs/tree/Methods.md#checkNode)                  | Node의 체크박스를 체크합니다.                  |
|                            | 8. [unCheckNode](./docs/tree/Methods.md#unCheckNode)              | Node의 체크박스 체크 해제합니다.               |
|                            | 9. [toggleCheckNode](./docs/tree/Methods.md#toggleCheckNode)      | Node의 체크박스 체크 상태를 토글합니다.        |
|                            | 10. [selectNode](./docs/tree/Methods.md#selectNode)              | Node를 선택합니다.                             |
|                            | 11. [getDepth](./docs/tree/Methods.md#getDepth)                   | 특정 Node의 depth를 가져옵니다.                 |
| **Node 관련 메소드**        | 1. [getIndexById](./docs/tree/Methods.md#getIndexById)            | ID로 Node의 인덱스를 가져옵니다.               |
|                            | 2. [getIndexByNode](./docs/tree/Methods.md#getIndexByNode)        | Node 객체로 인덱스를 가져옵니다.               |
|                            | 3. [getIndexByElement](./docs/tree/Methods.md#getIndexByElement)  | DOM 요소로 Node의 인덱스를 가져옵니다.         |
|                            | 4. [getId](./docs/tree/Methods.md#getId)                          | Node의 ID를 가져옵니다.                        |
|                            | 5. [getUpId](./docs/tree/Methods.md#getUpId)                      | 부모 Node의 ID를 가져옵니다.                   |
|                            | 6. [getNode](./docs/tree/Methods.md#getNode)                      | Node 객체를 가져옵니다.                        |
|                            | 7. [getUpNode](./docs/tree/Methods.md#getUpNode)                  | 부모 Node를 가져옵니다.                        |
|                            | 8. [getCheckedNode](./docs/tree/Methods.md#getCheckedNode)        | 체크된 Node를 가져옵니다.                      |
|                            | 9. [getSelectedNode](./docs/tree/Methods.md#getSelectedNode)      | 선택된 단일 Node를 가져옵니다.                 |
|                            | 10. [getSelectedNodes](./docs/tree/Methods.md#getSelectedNodes)   | 선택된 모든 Node를 가져옵니다.                 |
|                            | 11. [searchNode](./docs/tree/Methods.md#searchNode)              | 특정 조건에 맞는 Node를 검색합니다.            |
|                            | 12. [moveNode](./docs/tree/Methods.md#moveNode)                  | Node를 이동시킵니다.                           |
|                            | 13. [hasChild](./docs/tree/Methods.md#hasChild)                  | Node가 자식을 가지고 있는지 확인합니다.         |
| **Data 관련 메소드**        | 1. [getData](./docs/tree/Methods.md#getData)                      | Node의 데이터를 가져옵니다.                    |
|                            | 2. [getNodeValue](./docs/tree/Methods.md#getNodeValue)            | Node의 값을 가져옵니다.                        |
|                            | 3. [setNodeValue](./docs/tree/Methods.md#setNodeValue)            | Node의 값을 설정합니다.                        |
|                            | 4. [addNode](./docs/tree/Methods.md#addNode)                      | 새로운 Node를 추가합니다.                      |
|                            | 5. [removeNode](./docs/tree/Methods.md#removeNode)                | Node를 삭제합니다.                             |


### Node 메소드

| **분류**                  | **메소드**                                                    | **설명**                                    |
|---------------------------|--------------------------------------------------------------|---------------------------------------------|
| **Node 정보 메소드**       | 1. [getIndex](./docs/node/Methods.md#getIndex)               | Node의 인덱스를 가져옵니다.                    |
|                           | 2. [getParentNode](./docs/node/Methods.md#getParentNode)     | Node의 부모 노드를 가져옵니다.                  |
|                           | 3. [getChildNode](./docs/node/Methods.md#getChildNode)       | Node의 자식 노드를 가져옵니다.                  |
|                           | 4. [hasChild](./docs/node/Methods.md#hasChild)               | Node가 자식을 가지고 있는지 확인합니다.          |
|                           | 5. [getDepth](./docs/node/Methods.md#getDepth)               | Node의 depth를 가져옵니다.                     |
| **Node 동작 메소드**       | 1. [expandNode](./docs/node/Methods.md#expandNode)           | Node를 확장합니다.                              |
|                           | 2. [collapseNode](./docs/node/Methods.md#collapseNode)       | Node를 축소합니다.                              |
|                           | 3. [toggleNode](./docs/node/Methods.md#toggleNode)           | Node의 상태를 토글합니다.                        |
|                           | 4. [selectNode](./docs/node/Methods.md#selectNode)           | Node를 선택합니다.                              |
|                           | 5. [moveNode](./docs/node/Methods.md#moveNode)               | Node를 이동시킵니다.                            |
| **Node 요소 메소드**       | 1. [getNodeId](./docs/node/Methods.md#getNodeId)             | Node 요소의 ID를 가져옵니다.                     |
|                           | 2. [getNodeElement](./docs/node/Methods.md#getNodeElement)   | Node의 DOM 요소를 가져옵니다.                    |
|                           | 3. [getMain](./docs/node/Methods.md#getMain)                 | Node의 Main 요소를 가져옵니다.                   |
|                           | 4. [getMainLeft](./docs/node/Methods.md#getMainLeft)         | Node의 Left 요소를 가져옵니다.                   |
|                           | 5. [getMainMiddle](./docs/node/Methods.md#getMainMiddle)     | Node의 Middle 요소를 가져옵니다.                 |
|                           | 6. [getMainRight](./docs/node/Methods.md#getMainRight)       | Node의 Right 요소를 가져옵니다.                  |
|                           | 7. [getSub](./docs/node/Methods.md#getSub)                   | Node의 Sub 요소를 가져옵니다.                    |
| **Node 데이터 메소드**     | 1. [getData](./docs/node/Methods.md#getData)                 | Node의 데이터를 가져옵니다.                      |
|                           | 2. [getNodeValue](./docs/node/Methods.md#getNodeValue)       | Node의 값을 가져옵니다.                         |
|                           | 3. [setNodeValue](./docs/node/Methods.md#setNodeValue)       | Node의 값을 설정합니다.                         |
|                           | 4. [getFlag](./docs/node/Methods.md#getFlag)                 | Node의 플래그를 가져옵니다.                      |
|                           | 5. [addNode](./docs/node/Methods.md#addNode)                 | 새로운 Node를 추가합니다.                        |
|                           | 6. [removeNode](./docs/node/Methods.md#removeNode)           | Node를 삭제합니다.                              |