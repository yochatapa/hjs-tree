# Tree 메소드

Tree 메소드은 총 42개의 다양한 메소드들로 이루어져있습니다.

1. [init](#init)  
2. [getIdColumn](#getIdColumn)  
3. [getUpIdColumn](#getUpIdColumn)  
4. [setEditable](#setEditable)  
5. [setSelectable](#setSelectable)  
6. [setDraggable](#setDraggable)  
7. [setCheckbox](#setCheckbox)  
8. [setDefaultNodeId](#setDefaultNodeId)  
9. [setDataset](#setDataset)  
10. [addRightBtn](#addRightBtn)  
11. [removeRightBtn](#removeRightBtn)  
12. [addLeftBtn](#addLeftBtn)  
13. [removeLeftBtn](#removeLeftBtn)  
14. [getData](#getData)  
15. [getNodeValue](#getNodeValue)  
16. [setNodeValue](#setNodeValue)  
17. [getIndexById](#getIndexById)  
18. [getIndexByNode](#getIndexByNode)  
19. [getIndexByElement](#getIndexByElement)  
20. [getId](#getId)  
21. [getUpId](#getUpId)  
22. [getNode](#getNode)  
23. [getUpNode](#getUpNode)  
24. [selectNode](#selectNode)  
25. [getSelectedNode](#getSelectedNode)  
26. [getSelectedNodes](#getSelectedNodes)  
27. [searchNode](#searchNode)  
28. [getDepth](#getDepth)  
29. [addNode](#addNode)  
30. [removeNode](#removeNode)  
31. [moveNode](#moveNode)  
32. [hasChild](#hasChild)  
33. [expandNode](#expandNode)  
34. [expandNodeAll](#expandNodeAll)  
35. [collapseNode](#collapseNode)  
36. [collapseNodeAll](#collapseNodeAll)  
37. [openNode](#openNode)  
38. [openNodeByDepth](#openNodeByDepth)  
39. [checkNode](#checkNode)  
40. [unCheckNode](#unCheckNode)  
41. [toggleCheckNode](#toggleCheckNode)  
42. [getCheckedNode](#getCheckedNode)


각 메소드를 기능별로 구분해보면 다음과 같이 분류됩니다.

1. 초기화 및 속성 관련 메소드 (13개 메소드)
2. Tree 동작 메소드 (11개 메소드)
3. Node 관련 메소드 (13개 메소드)
4. data관련 메소드 (5개 메소드)

# 초기화 및 속성 관련 메소드

초기화 및 속성 관련 메소드는 Tree를 초기화하는 기능과 각 속성을 설정하고, 가져오는 기능 등을 수행합니다.
초기화 및 속성 관련 메소드는 Tree를 구성하는데 중요한 역할을 하는 메소드들입니다.

초기화 및 속성 관련 메소드는 다음과 같습니다.

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

`setEditable` 메소드는 Tree의 `editable` 속성을 설정하는 메소드입니다.

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

`setSelectable` 메소드는 Tree의 `selectable` 속성을 설정하는 메소드입니다.

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

`setDraggable` 메소드는 Tree의 `draggable` 속성을 설정하는 메소드입니다.

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