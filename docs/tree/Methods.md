# Tree 메소드

Tree 메소드은 총 42개의 다양한 메소드들로 이루어져있습니다.

| **분류**                   | **메소드**                                    | **설명**                                      |
|----------------------------|----------------------------------------------|-----------------------------------------------|
| **초기화 및 옵션 관련 메소드** | 1. [init](#init)                           | 트리를 초기화합니다.                           |
|                            | 2. [getIdColumn](#getIdColumn)               | ID 컬럼을 가져옵니다.                          |
|                            | 3. [getUpIdColumn](#getUpIdColumn)           | 부모 ID 컬럼을 가져옵니다.                     |
|                            | 4. [setEditable](#setEditable)               | 트리를 편집 가능하도록 설정합니다.              |
|                            | 5. [setSelectable](#setSelectable)           | 선택 가능 여부를 설정합니다.                   |
|                            | 6. [setDraggable](#setDraggable)             | 드래그 가능 여부를 설정합니다.                 |
|                            | 7. [setCheckbox](#setCheckbox)               | 체크박스 사용 여부를 설정합니다.               |
|                            | 8. [setDefaultNodeId](#setDefaultNodeId)     | 기본 Node ID를 설정합니다.                     |
|                            | 9. [setDataset](#setDataset)                 | 데이터를 설정합니다.                           |
|                            | 10. [addRightBtn](#addRightBtn)             | 오른쪽 버튼을 추가합니다.                      |
|                            | 11. [removeRightBtn](#removeRightBtn)       | 오른쪽 버튼을 제거합니다.                      |
|                            | 12. [addLeftBtn](#addLeftBtn)               | 왼쪽 버튼을 추가합니다.                        |
|                            | 13. [removeLeftBtn](#removeLeftBtn)         | 왼쪽 버튼을 제거합니다.                        |
| **트리 동작 메소드**        | 1. [expandNode](#expandNode)                | 특정 Node를 확장합니다.                        |
|                            | 2. [expandNodeAll](#expandNodeAll)          | 모든 Node를 확장합니다.                        |
|                            | 3. [collapseNode](#collapseNode)            | 특정 Node를 축소합니다.                        |
|                            | 4. [collapseNodeAll](#collapseNodeAll)      | 모든 Node를 축소합니다.                        |
|                            | 5. [openNode](#openNode)                    | 특정 Node를 엽니다.                            |
|                            | 6. [openNodeByDepth](#openNodeByDepth)      | 특정 depth까지 Node를 엽니다.                   |
|                            | 7. [checkNode](#checkNode)                  | Node의 체크박스를 체크합니다.                  |
|                            | 8. [unCheckNode](#unCheckNode)              | Node의 체크박스 체크 해제합니다.               |
|                            | 9. [toggleCheckNode](#toggleCheckNode)      | Node의 체크박스 체크 상태를 토글합니다.        |
|                            | 10. [selectNode](#selectNode)              | Node를 선택합니다.                             |
|                            | 11. [getDepth](#getDepth)                   | 특정 Node의 depth를 가져옵니다.                 |
| **Node 관련 메소드**        | 1. [getIndexById](#getIndexById)            | ID로 Node의 인덱스를 가져옵니다.               |
|                            | 2. [getIndexByNode](#getIndexByNode)        | Node 객체로 인덱스를 가져옵니다.               |
|                            | 3. [getIndexByElement](#getIndexByElement)  | DOM 요소로 Node의 인덱스를 가져옵니다.         |
|                            | 4. [getId](#getId)                          | Node의 ID를 가져옵니다.                        |
|                            | 5. [getUpId](#getUpId)                      | 부모 Node의 ID를 가져옵니다.                   |
|                            | 6. [getNode](#getNode)                      | Node 객체를 가져옵니다.                        |
|                            | 7. [getUpNode](#getUpNode)                  | 부모 Node를 가져옵니다.                        |
|                            | 8. [getCheckedNode](#getCheckedNode)        | 체크된 Node를 가져옵니다.                      |
|                            | 9. [getSelectedNode](#getSelectedNode)      | 선택된 단일 Node를 가져옵니다.                 |
|                            | 10. [getSelectedNodes](#getSelectedNodes)   | 선택된 모든 Node를 가져옵니다.                 |
|                            | 11. [searchNode](#searchNode)              | 특정 조건에 맞는 Node를 검색합니다.            |
|                            | 12. [moveNode](#moveNode)                  | Node를 이동시킵니다.                           |
|                            | 13. [hasChild](#hasChild)                  | Node가 자식을 가지고 있는지 확인합니다.         |
| **Data 관련 메소드**        | 1. [getData](#getData)                      | Node의 데이터를 가져옵니다.                    |
|                            | 2. [getNodeValue](#getNodeValue)            | Node의 값을 가져옵니다.                        |
|                            | 3. [setNodeValue](#setNodeValue)            | Node의 값을 설정합니다.                        |
|                            | 4. [addNode](#addNode)                      | 새로운 Node를 추가합니다.                      |
|                            | 5. [removeNode](#removeNode)                | Node를 삭제합니다.                             |


각 메소드를 기능별로 구분해보면 다음과 같이 분류됩니다.

1. 초기화 및 옵션 관련 메소드 (13개 메소드)
2. Tree 동작 메소드 (11개 메소드)
3. Node 관련 메소드 (13개 메소드)
4. Data 관련 메소드 (5개 메소드)

# 초기화 및 옵션 관련 메소드

초기화 및 옵션 관련 메소드는 Tree를 초기화하는 기능과 각 옵션을 설정하고, 가져오는 기능 등을 수행합니다.
초기화 및 옵션 관련 메소드는 Tree를 구성하는데 중요한 역할을 하는 메소드들입니다.

초기화 및 옵션 관련 메소드는 다음과 같습니다.

1. init
2. getIdColumn
3. getUpIdColumn
4. setEditable
5. setSelectable
6. setDraggable
7. setCheckbox
8. setDefaultNodeId
9. setDataset
10. addRightBtn
11. removeRightBtn
12. addLeftBtn
13. removeLeftBtn

각 메소드들에 대한 상세 설명은 다음과 같습니다.

## init

`init` 메소드는 Tree를 초기화하는 메소드입니다.

### 매개변수
- `{Json} option`: Tree를 설정하기 위한 옵션 객체

### 사용 예시

```javascript
tree.init({
    selector: "#group1",
    treeData: treeData,
    idColumn: "SN",
    upIdColumn: "UP_SN",
    labelColumn: "LABEL_NM",
    rootName: "ROOT",
    orderColumn: "ORDER_NO",
    defaultNodeId: "treeNode",
    checkbox: "both",
    leftBtn: [leftBtn1, leftBtn2],
    rightBtn: [rightBtn],
    dataset: "TREE",
    editable: true,
    draggable: true,
    selectable: true,
    event: {
        click: treeClick,
    },
});
```


## getIdColumn

`getIdColumn` 메소드는 Tree의 `idOption` 정보를 가져오는 메소드입니다.

### 반환 값
- `{String}`: Tree에서 사용하는 ID 컬럼의 이름

### 사용 예시

```javascript
tree.getIdColumn();
```


## getUpIdColumn

`getUpIdColumn` 메소드는 Tree의 `upIdOption` 정보를 가져오는 메소드입니다.

### 반환 값
- `{String}`: Tree에서 사용하는 부모 ID 컬럼의 이름

### 사용 예시

```javascript
tree.getUpIdColumn();
```


## setEditable

`setEditable` 메소드는 Tree의 `editable` 옵션을 설정하는 메소드입니다.

### 매개변수
- `{boolean} editable`: Tree의 편집 가능 여부를 설정합니다.  
  - `true`: 편집 가능  
  - `false`: 편집 불가  

### 사용 예시

```javascript
tree.setEditable(true); // Tree를 편집 가능 상태로 설정
tree.setEditable(false); // Tree를 편집 불가 상태로 설정
```


## setSelectable

`setSelectable` 메소드는 Tree의 `selectable` 옵션을 설정하는 메소드입니다.

### 매개변수
- `{boolean} selectable`: Tree의 노드 선택 가능 여부를 설정합니다.  
  - `true`: 선택 가능  
  - `false`: 선택 불가  

### 사용 예시

```javascript
tree.setSelectable(true); // Tree를 선택 가능 상태로 설정
tree.setSelectable(false); // Tree를 선택 불가 상태로 설정
```


## setDraggable

`setDraggable` 메소드는 Tree의 `draggable` 옵션을 설정하는 메소드입니다.

### 매개변수
- `{boolean} draggable`: Tree의 노드를 드래그 가능한지 여부를 설정합니다.  
  - `true`: 드래그 가능  
  - `false`: 드래그 불가  

### 사용 예시

```javascript
tree.setDraggable(true); // Tree의 노드를 드래그 가능 상태로 설정
tree.setDraggable(false); // Tree의 노드를 드래그 불가 상태로 설정
```


## setCheckbox

`setCheckbox` 메소드는 checkbox 위치를 설정하는 메소드입니다.

### 매개변수
- `{string} checkbox`: 체크박스의 위치를 설정합니다.  
  - `""`: 체크박스 미표시  
  - `"left"`: 체크박스를 왼쪽에 표시  
  - `"right"`: 체크박스를 오른쪽에 표시  
  - `"both"`: 체크박스를 양쪽에 표시  

### 사용 예시

```javascript
tree.setCheckbox("");   // 체크박스 미표시
tree.setCheckbox("left"); // 체크박스를 왼쪽에 표시
tree.setCheckbox("right"); // 체크박스를 오른쪽에 표시
tree.setCheckbox("both"); // 체크박스를 양쪽에 표시
```


## setDefaultNodeId

`setDefaultNodeId` 메소드는 기본 노드 ID를 설정하는 메소드입니다.

### 매개변수
- `{string} defaultNodeId`: 기본 노드의 ID를 지정합니다.

### 사용 예시

```javascript
tree.setDefaultNodeId("defaultNodeId");
```


## setDataset

`setDataset` 메소드는 dataset 정보를 설정하는 메소드입니다.

### 매개변수
- `{string} dataset`: 설정할 dataset의 이름을 지정합니다.

### 사용 예시

```javascript
tree.setDataset("dataset");
```


## addRightBtn

`addRightBtn` 메소드는 rightBtn 정보를 추가하는 메소드입니다.

### 매개변수
- `{function} rightBtn`: 실행할 콜백 함수를 지정합니다.

### 사용 예시

```javascript
let clickRightBtn = function(){
    alert("hello world!");
};

tree.addRightBtn(clickRightBtn);
```


## removeRightBtn

`removeRightBtn` 메소드는 rightBtn 정보를 삭제하는 메소드입니다.

### 매개변수
- `{number} rightBtnNum`: 삭제할 rightBtn의 번호 (좌측부터 시작, 0부터 시작)

### 사용 예시

```javascript
tree.removeRightBtn(0);
```

## addLefttBtn

`addLefttBtn` 메소드는 leftBtn 정보를 추가하는 메소드입니다.

### 매개변수
- `{function} leftBtn`: leftBtn으로 추가할 함수

### 사용 예시

```javascript
let clickLeftBtn = function() {
  alert("hello world!");
};

tree.addLefttBtn(clickLeftBtn);
```


## removeLeftBtn

`removeLeftBtn` 메소드는 leftBtn 정보를 삭제하는 메소드입니다.

### 매개변수
- `{number} leftBtnNum`: 삭제할 leftBtn의 번호 (좌측부터 시작, 0부터 시작)

### 사용 예시

```javascript
tree.removeLeftBtn(0);
```

# Tree 동작 메소드

Tree 동작 메소드는 Tree의 동작과 관련된 기능을 하는 메소드입니다.

Tree 동작 메소드는 다음과 같습니다.

1. expandNode
2. expandNodeAll
3. collapseNode
4. collapseNodeAll
5. openNode
6. openNodeByDepth
7. checkNode
8. unCheckNode
9. toggleCheckNode
10. selectNode
11. getDepth

각 메소드들에 대한 상세 설명은 다음과 같습니다.

## expandNode

`expandNode` 메소드는 입력한 index의 node를 펼치는 메소드입니다.

### 매개변수
- `{number} index`: 펼치고자 하는 node의 index

### 사용 예시

```javascript
tree.expandNode(0);
```


## expandNodeAll

`expandNodeAll` 메소드는 Tree의 모든 Node들을 펼치는 메소드입니다.

### 사용 예시

```javascript
tree.expandNodeAll();
```


## collapseNode

`collapseNode` 메소드는 입력한 `index`의 node를 닫는 메소드입니다.

### 매개변수

- `index` {number}: 닫을 node의 인덱스

### 사용 예시

```javascript
tree.collapseNode(0);
```


## collapseNodeAll

`collapseNodeAll` 메소드는 Tree의 모든 Node들을 닫는 메소드입니다.

### 사용 예시

```javascript
tree.collapseNodeAll();
```


## openNode

`openNode` 메소드는 입력한 `index`의 node부터 부모 node들을 전부 펼치는 메소드입니다.

### 메소드 정보

- **매개변수**
  - `index` (`number`): 펼칠 node의 인덱스입니다.

### 사용 예시

```javascript
tree.openNode(0);
```


## openNodeByDepth

`openNodeByDepth` 메소드는 입력한 `depth`까지 node들을 전부 펼치는 메소드입니다.

### 메소드 정보

- **매개변수**
  - `depth` (`number`): 펼칠 node의 깊이를 설정합니다.

### 사용 예시

```javascript
tree.openNodeByDepth(0);
```


## checkNode

`checkNode` 메소드는 입력한 `index`의 node의 checkbox를 체크하는 메소드입니다.

### 메소드 정보

- **매개변수**
  - `index` (`number`): 체크할 node의 index입니다.
  - `checkbox option` (`string`): 체크할 checkbox의 위치를 설정합니다.
    - `left`: 왼쪽 checkbox 체크
    - `right`: 오른쪽 checkbox 체크
    - `both`: 양쪽 checkbox 모두 체크

### 사용 예시

```javascript
// 왼쪽 checkbox 체크
tree.checkNode(0, "left");

// 오른쪽 checkbox 체크
tree.checkNode(0, "right");

// 양쪽 checkbox 모두 체크
tree.checkNode(0, "both");
```

## unCheckNode

`unCheckNode` 메소드는 입력한 `index`의 node의 checkbox를 체크 해제하는 메소드입니다.

### 메소드 정보

- **매개변수**
  - `index` (`number`): 체크 해제할 node의 index입니다.
  - `checkbox option` (`string`): 체크 해제할 checkbox의 위치를 설정합니다.
    - `left`: 왼쪽 checkbox 체크 해제
    - `right`: 오른쪽 checkbox 체크 해제
    - `both`: 양쪽 checkbox 모두 체크 해제

### 사용 예시

```javascript
// 왼쪽 checkbox 체크 해제
tree.unCheckNode(0, "left");

// 오른쪽 checkbox 체크 해제
tree.unCheckNode(0, "right");

// 양쪽 checkbox 모두 체크 해제
tree.unCheckNode(0, "both");
```


## toggleCheckNode

`toggleCheckNode` 메소드는 입력한 `index`의 node의 checkbox 상태를 확인하여, 체크된 경우 체크 해제하고, 체크되지 않은 경우 체크하는 메소드입니다.

### 메소드 정보

- **매개변수**
  - `index` (`number`): 체크 여부를 토글할 node의 index입니다.
  - `checkbox option` (`string`): 체크 여부를 토글할 checkbox의 위치를 설정합니다.
    - `left`: 왼쪽 checkbox의 상태를 토글
    - `right`: 오른쪽 checkbox의 상태를 토글
    - `both`: 양쪽 checkbox의 상태를 토글

### 사용 예시

```javascript
// 왼쪽 checkbox의 상태를 토글
tree.toggleCheckNode(0, "left");

// 오른쪽 checkbox의 상태를 토글
tree.toggleCheckNode(0, "right");

// 양쪽 checkbox의 상태를 토글
tree.toggleCheckNode(0, "both");
```

## selectNode

`selectNode` 메소드는 입력한 `index`의 node를 선택하는 메소드입니다. 선택된 node는 특정 스타일 변경이나 추가 작업을 수행하는 데 사용할 수 있습니다.

### 메소드 정보

- **매개변수**
  - `index` (`number`): 선택할 node의 index입니다.
  - `duplicate flag` (`boolean`): 중복 선택 여부를 결정합니다.
    - `true`: 기존에 선택된 node와 함께 중복 선택을 허용합니다.
    - `false` (기본값): 기존 선택된 node를 해제하고 새로운 node만 선택합니다.

### 사용 예시

```javascript
// index 0의 node를 선택 (중복 선택 허용)
tree.selectNode(0, true);

// index 1의 node를 선택 (중복 선택 비허용)
tree.selectNode(1, false);

// index 2의 node를 선택 (기본값 사용, 중복 선택 비허용)
tree.selectNode(2);
```


## getDepth

`getDepth` 메소드는 Tree의 전체 깊이를 반환하는 메소드입니다. 이 메소드를 통해 트리 구조에서 가장 깊은 레벨을 알 수 있습니다.

### 메소드 정보

- **반환값**: `depth` (`number`): 트리의 깊이를 나타내는 숫자입니다.

### 사용 예시

```javascript
// 트리의 깊이를 반환
var depth = tree.getDepth();
console.log(depth);
```




# Node 관련 메소드


Node 관련 메소드는 Node와 관련된 기능을 다루는 메소드입니다.

Node 관련 메소드는 다음과 같습니다.

1. getIndexById
2. getIndexByNode
3. getIndexByElement
4. getId
5. getUpId
6. getNode
7. getUpNode
8. getCheckedNode
9. getSelectedNode
10. getSelectedNodes
11. searchNode
12. moveNode
13. hasChild

각 메소드들에 대한 상세 설명은 다음과 같습니다.


## getIndexById

`getIndexById` 메소드는 입력한 키값과 상위 키값을 가진 node의 index를 반환해주는 메소드입니다.

### 메소드 정보

- **매개변수**
  - `id` (`string`): Tree 키값입니다.
  - `upId` (`string`): 상위 노드의 Tree 키값입니다.

- **반환값**
  - `index` (`number`): 찾지 못하면 `null` 값이 반환됩니다.

### 사용 예시

```javascript
// "SN" 키값을 가진 node의 index를 찾고, 상위 키값 "UP_SN"에 해당하는 node의 index를 반환
tree.getIndexById("SN", "UP_SN");
```


## getIndexByNode

`getIndexByNode` 메소드는 입력한 Node의 index를 반환해주는 메소드입니다.

### 메소드 정보

- **매개변수**
  - `node` (`node`): index를 반환할 대상 node입니다.

- **반환값**
  - `index` (`number`): 찾지 못하면 `null` 값이 반환됩니다.

### 사용 예시

```javascript
// 선택된 node를 가져옴
let node = tree.getSelectedNode();

// 해당 node의 index를 반환
tree.getIndexByNode(node);
```


## getIndexByElement

`getIndexByElement` 메소드는 입력한 `element`와 동일한 `element`를 가진 Node의 index를 반환해주는 메소드입니다.

### 메소드 정보

- **매개변수**
  - `element` (`element`): index를 반환할 대상 element입니다.

- **반환값**
  - `index` (`number`): 찾지 못하면 `null` 값이 반환됩니다.

### 사용 예시

```javascript
// 선택된 node의 element를 가져옴
let nodeElement = tree.getSelectedNode().getNodeElement();

// 해당 element의 index를 반환
tree.getIndexByElement(nodeElement);
```


## getId

`getId` 메소드는 입력한 `index`를 가진 Node의 `idColumn`을 컬럼명으로 하는 컬럼의 값을 반환하는 메소드입니다.

### 메소드 정보

- **매개변수**
  - `index` (`number`): `idColumn` 값을 반환할 Node의 index입니다.

- **반환값**
  - `id` (`string`): 해당 Node의 `idColumn` 값이 반환됩니다.

### 사용 예시

```javascript
// index 0의 Node에서 idColumn 값을 반환
tree.getId(0);
```


## getUpId

`getUpId` 메소드는 입력한 `index`를 가진 Node의 `upIdColumn`을 컬럼명으로 하는 컬럼의 값을 반환하는 메소드입니다.

### 메소드 정보

- **매개변수**
  - `index` (`number`): `upIdColumn` 값을 반환할 Node의 index입니다.

- **반환값**
  - `upId` (`string`): 해당 Node의 `upIdColumn` 값이 반환됩니다.

### 사용 예시

```javascript
// index 0의 Node에서 upIdColumn 값을 반환
tree.getUpId(0);
```

## getNode

`getNode` 메소드는 입력한 `index`를 가진 Node를 반환하는 메소드입니다.

### 메소드 정보

- **매개변수**
  - `index` (`number`): 반환할 Node의 index입니다.

- **반환값**
  - `node` (`node`): 해당 index를 가진 Node 객체가 반환됩니다.

### 사용 예시

```javascript
// index 0에 해당하는 Node를 반환
tree.getNode(0);
```


## getUpNode

`getUpNode` 메소드는 입력한 `index`를 가진 Node의 부모 Node를 반환하는 메소드입니다.

### 메소드 정보

- **매개변수**
  - `index` (`number`): 부모 Node를 찾을 대상 Node의 index입니다.

- **반환값**
  - `upNode` (`node`): 해당 index를 가진 Node의 부모 Node 객체가 반환됩니다.

### 사용 예시

```javascript
// index 0에 해당하는 Node의 부모 Node를 반환
tree.getUpNode(0);
```


## getCheckedNode

`getCheckedNode` 메소드는 입력한 checkbox option의 checkbox에 체크된 Node를 반환하는 메소드입니다.

### 메소드 정보

- **매개변수**
  - `checkbox option` (`string`): 체크된 checkbox에 대한 옵션을 지정합니다.
    - `"left"`: 왼쪽 checkbox에 체크된 Node 반환
    - `"right"`: 오른쪽 checkbox에 체크된 Node 반환
    - `"both"`: 양쪽 checkbox 모두 체크된 Node 반환

- **반환값**
  - `node array` (`array`): 체크된 Node들의 배열이 반환됩니다.

### 사용 예시

```javascript
// 왼쪽 checkbox에 체크된 Node 반환
tree.getCheckedNode("left");

// 오른쪽 checkbox에 체크된 Node 반환
tree.getCheckedNode("right");

// 양쪽 checkbox에 체크된 Node 반환
tree.getCheckedNode("both");
```


## getSelectedNode

`getSelectedNode` 메소드는 선택된 Node를 반환하는 메소드입니다. 선택된 Node가 여러 개 있더라도, 가장 빠른 index를 가진 Node 하나만 반환됩니다.

### 메소드 정보

- **반환값**
  - `node`: 선택된 가장 빠른 index를 가진 Node를 반환합니다.

### 사용 예시

```javascript
// 선택된 Node 반환
let selectedNode = tree.getSelectedNode();
```


## getSelectedNodes

`getSelectedNodes` 메소드는 선택된 Node들을 배열로 반환합니다. 선택된 Node가 없으면 빈 배열을 반환합니다.

### 메소드 정보

- **반환값**
  - `array`: 선택된 Node들이 배열로 반환되며, 선택된 Node가 없으면 빈 배열을 반환합니다.

### 사용 예시

```javascript
// 선택된 Node들 배열로 반환
let selectedNodes = tree.getSelectedNodes();
```


## searchNode

`searchNode` 메소드는 지정한 `column`과 `value`를 가진 Node를 반환합니다. 또한, `selectFlag`와 `openFlag`를 설정하여 찾은 Node의 상태를 지정할 수 있습니다.

### 메소드 정보

- **매개변수**
  - `column` (string): 검색할 컬럼명
  - `value` (string): 해당 컬럼에서 찾을 값
  - `selectFlag` (boolean, default: true): `true`일 경우 찾은 node를 선택
  - `openFlag` (boolean, default: true): `true`일 경우 찾은 node부터 상위 node들을 모두 펼침

- **반환값**
  - `array`: 조건에 맞는 Node들이 배열로 반환됩니다.

### 사용 예시

```javascript
// column이 "COLUMN"이고, value가 "value"인 Node를 검색하고, 기본적으로 선택 및 펼침
tree.searchNode("COLUMN", "value");

// column이 "COLUMN"이고, value가 "value"인 Node를 검색하며, 선택만 하고 펼침은 하지 않음
tree.searchNode("COLUMN", "value", true, false);
```


## moveNode

`moveNode` 메소드는 지정한 `index`를 가진 Node를 다른 `target index`를 기준으로 이동시키는 메소드입니다. 이동 위치는 `move option`에 따라 달라집니다.

### 메소드 정보

- **매개변수**
  - `index` (number): 이동시킬 Node의 인덱스
  - `targetIndex` (number): 이동 기준이 되는 대상 Node의 인덱스
  - `moveOption` (string, default: `"last"`): 이동 옵션
    - `"last"`: 대상 Node의 하위에서 가장 마지막 위치로 이동
    - `"first"`: 대상 Node의 하위에서 가장 첫 번째 위치로 이동
    - `"before"`: 대상 Node의 부모 하위에서 대상 Node 앞에 이동
    - `"after"`: 대상 Node의 부모 하위에서 대상 Node 뒤에 이동
  - `node` (node, optional): 기준 Node (move option이 `"before"`나 `"after"`일 때 사용, default는 `target`)

- **반환값**
  - `number | boolean`: 실패 시 실패 코드, 성공 시 성공 flag

### 사용 예시

```javascript
// index가 0인 Node를 index가 1인 Node의 하위로 이동하며 순서는 가장 마지막으로 이동
tree.moveNode(0, 1);

// index가 0인 Node를 index가 1인 Node의 하위로 이동하며 순서는 가장 첫 번째로 이동
tree.moveNode(0, 1, "first");

// index가 0인 Node를 index가 1인 Node의 부모 하위로 이동하며 순서는 index가 1인 Node의 앞에 이동
tree.moveNode(0, 1, "before");

// index가 0인 Node를 index가 1인 Node의 부모 하위로 이동하며 순서는 index가 2인 Node의 뒤에 이동
tree.moveNode(0, 1, "after", tree.getNode(2));
```

## hasChild

`hasChild` 메소드는 지정한 `index`를 가진 Node가 자식 Node를 가지고 있는지 여부를 반환하는 메소드입니다.

### 메소드 정보

- **매개변수**
  - `index` (number): 자식 Node가 있는지 확인할 Node의 인덱스

- **반환값**
  - `boolean`: 자식 Node가 있으면 `true`, 없으면 `false`

### 사용 예시

```javascript
// index가 0인 Node가 자식 Node를 가지고 있는지 확인
tree.hasChild(0);
```



# Data 관련 메소드

Data 관련 메소드는 Node의 data와 관련된 기능을 다루는 메소드입니다.

Data 관련 메소드는 다음과 같습니다.

1. getData
2. getNodeValue
3. setNodeValue
4. addNode
5. removeNode

각 메소드들에 대한 상세 설명은 다음과 같습니다.


## getData

`getData` 메소드는 Tree가 가지고 있는 전체 Node의 데이터를 반환하는 메소드입니다. 각 Node의 데이터는 JSON 형식으로 이루어져 있습니다.

### 메소드 정보

- **반환값**
  - `array`: Tree의 모든 Node 데이터를 포함한 배열, 각 데이터는 JSON 형식입니다.

### 사용 예시

```javascript
// 전체 Tree의 데이터를 가져오기
tree.getData();
```


## getNodeValue

`getNodeValue` 메소드는 입력한 index의 Node에서 특정 column명에 해당하는 데이터를 반환하는 메소드입니다.

### 메소드 정보

- **매개변수**
  - `index` (number): 값을 조회할 Node의 index.
  - `column명` (string): 조회할 column의 이름.

- **반환값**
  - `value` (string): 지정된 Node에서 해당 column에 저장된 값.

### 사용 예시

```javascript
// 0을 index로 갖는 Node의 'COL' column 값을 반환
tree.getNodeValue(0, "COL");
```


## setNodeValue

`setNodeValue` 메소드는 주어진 `index`에 해당하는 Node의 `column명`을 지정된 새로운 값(`new value`)으로 변경하는 메소드입니다. 이때, 해당 Node의 `IUDFLAG`는 "U"로 변경됩니다.

### 메소드 정보

- **매개변수**
  - `index` (number): 값을 변경할 Node의 인덱스.
  - `column명` (string): 변경할 column의 이름.
  - `new value` (string): 새로 설정할 값.
  - `moveNode flag` (boolean, 기본값: true): `false`로 설정하면 노드가 이동하지 않음.

- **반환값**
  - `0`: 성공
  - 실패 시: 실패 코드 반환, 오류 메시지 표시

### 동작 방식
1. `column명이 idColumn`과 동일한 경우:
   - 하위 노드들의 `upIdColumn` 데이터도 변경되며, 해당 노드들의 `IUDFLAG`도 "U"로 변경됩니다.
2. `column명이 upIdColumn`과 동일한 경우:
   - 해당 `upIdColumn`의 하위 노드로 이동합니다. `moveNode flag`가 `false`로 설정된 경우 이동하지 않습니다.

### 사용 예시

```javascript
// index가 0인 Node의 'COL' 값을 'new value'로 변경
tree.setNodeValue(0, "COL", "new value");
```


## addNode

`addNode` 메소드는 지정된 `index`에 해당하는 Node의 하위에 새로운 Node를 추가하는 메소드입니다. 추가하려는 데이터가 있을 경우, `new data`를 함께 전달하여 Node를 생성할 수 있습니다.

### 메소드 정보

- **매개변수**
  - `index` (number): 새로운 Node를 추가할 부모 Node의 인덱스.
  - `new data` (json): 추가할 새로운 Node에 포함될 데이터.

- **반환값**
  - `0`: 성공
  - 실패 시: 실패 코드 반환

### 사용 예시

1. **기본적인 Node 추가**
  ```javascript
  // index가 0인 Node의 하위에 새로운 Node 추가
  tree.addNode(0);
  ```

2. **데이터와 함께 Node 추가**
  ```javascript
  let addData = {
      "SN": 1,
      "UP_SN": 0,
      "LABEL_NM": "new node",
      "ORDER_NO": 0
  };

  // index가 0인 Node의 하위에 'addData' 데이터를 가진 새로운 Node 추가
  tree.addNode(0, addData);
  ```

## removeNode

`removeNode` 메소드는 지정한 `index`에 해당하는 Node를 삭제하는 메소드입니다. 삭제된 Node의 `IUDFLAG`는 `D`로 설정되며, 화면에서 해당 Node는 제거됩니다.

### 메소드 정보

- **매개변수**
  - `index` (number): 삭제할 Node의 인덱스.

### 사용 예시

```javascript
// index가 0인 Node 삭제
tree.removeNode(0);
```