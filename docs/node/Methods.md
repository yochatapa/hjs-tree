# Node 메소드

Node 메소드은 총 23개의 다양한 메소드들로 이루어져있습니다.

1. [getIndex](#getIndex)
2. [getParentNode](#getParentNode)
3. [getChildNode](#getChildNode)
4. [hasChild](#hasChild)
5. [getDepth](#getDepth)
6. [expandNode](#expandNode)
7. [collapseNode](#collapseNode)
8. [toggleNode](#toggleNode)
9. [selectNode](#selectNode)
10. [moveNode](#moveNode)
11. [getNodeId](#getNodeId)
12. [getNodeElement](#getNodeElement)
13. [getMain](#getMain)
14. [getMainLeft](#getMainLeft)
15. [getMainMiddle](#getMainMiddle)
16. [getMainRight](#getMainRight)
17. [getSub](#getSub)
18. [getData](#getData)
19. [getNodeValue](#getNodeValue)
20. [setNodeValue](#setNodeValue)
21. [getFlag](#getFlag)
22. [addNode](#addNode)
23. [removeNode](#removeNode)



각 메소드를 기능별로 구분해보면 다음과 같이 분류됩니다.

1. Node 정보 메소드 (5개 메소드)
2. Node 동작 메소드 (5개 메소드)
3. Node 요소 메소드 (7개 메소드)
4. Node 데이터 메소드 (6개 메소드)

# Node 정보 메소드

Node 정보 메소드는 Node 정보를 가져오는 역할을 수행합니다.

Node 정보 메소드는 다음과 같습니다.

1. getIndex
2. getParentNode
3. getChildNode
4. hasChild
5. getDepth

각 메소드들에 대한 상세 설명은 다음과 같습니다.

## getIndex

`getIndex` 메소드는 Node의 index를 반환하는 메소드입니다.

### 반환 값
- `{number}`: Node의 index

### 사용 예시

```javascript
// node 예시
let node = tree.getSelectedNode();

node.getIndex();
```

## getParentNode

`getParentNode` 메소드는 Node의 부모 Node를 반환하는 메소드입니다.

### 반환 값
- `{node}`: 부모 Node

### 사용 예시

```javascript
// node 예시
let node = tree.getSelectedNode();

node.getParentNode();
```

## getChildNode

`getChildNode` 메소드는 Node의 자식 Node를 반환하는 메소드입니다.

### 반환 값
- `{array}`: 자식 Node들

### 사용 예시

```javascript
// node 예시
let node = tree.getSelectedNode();

node.getChildNode();
```

## hasChild

`hasChild` 메소드는 Node의 자식 Node 유무를 반환하는 메소드입니다.

### 반환 값
- `{boolean}`: 자식 Node 유무 (자식이 있으면 `true`, 없으면 `false`)

### 사용 예시

```javascript
// node 예시
let node = tree.getSelectedNode();

node.hasChild();
```

## getDepth

`getDepth` 메소드는 Node의 Depth를 반환하는 메소드입니다.

### 반환 값
- `{number}`: Node의 Depth

### 사용 예시

```javascript
// node 예시
let node = tree.getSelectedNode();

node.getDepth();
```

# Node 동작 메소드

Node 동작 메소드는 Node 정보를 가져오는 역할을 수행합니다.

Node 동작 메소드는 다음과 같습니다.

1. expandNode
2. collapseNode
3. toggleNode
4. selectNode
5. moveNode

각 메소드들에 대한 상세 설명은 다음과 같습니다.

## expandNode

`expandNode` 메소드는 Node를 펼치는 메소드입니다.

### 사용 예시

```javascript
// node 예시
let node = tree.getSelectedNode();

node.expandNode();
```

## collapseNode

`collapseNode` 메소드는 Node를 접는(축소하는) 메소드입니다.

### 사용 예시

```javascript
// node 예시
let node = tree.getSelectedNode();

node.collapseNode();
```

## toggleNode

`toggleNode` 메소드는 Node의 펼침 여부에 따라 Node를 펼치거나 닫는 메소드입니다.

### 사용 예시

```javascript
// node 예시
let node = tree.getSelectedNode();

node.toggleNode();
```

## selectNode

`selectNode` 메소드는 Flag에 따라 Node를 선택하거나 선택 해제하는 메소드입니다.

### 매개변수
- `{boolean}` - `true`: 선택, `false`: 선택 해제

### 사용 예시

```javascript
// node 예시
let node = tree.getSelectedNode();

node.selectNode(true | false);
```

## moveNode

`moveNode` 메소드는 입력한 target index를 가진 Node를 기준으로 Node를 이동시키는 메소드입니다.

### 매개변수
- `{number}` target index: 이동할 Node의 target index
- `{string}` move option (선택적) - default는 `last`:
  - `last`: target의 하위로 이동하며, 순서는 가장 마지막으로 이동
  - `first`: target의 하위로 이동하며, 순서는 가장 첫번째로 이동
  - `before`: target의 부모의 하위(target과 같은 위치)로 이동하며, 순서는 기준 node의 하나 앞
  - `after`: target의 부모의 하위(target과 같은 위치)로 이동하며, 순서는 기준 node의 하나 뒤
- `{node}` 기준 node (선택적) - `move option`이 `before`, `after`일 경우 사용, default는 target

### 반환 값
- `{number | boolean}` - 실패 시 실패 코드 반환, 성공 시 성공 flag 반환

### 사용 예시

```javascript
// node 예시
let node = tree.getSelectedNode();

// index가 0인 node의 하위로 이동하며 순서는 가장 마지막으로 이동
node.moveNode(0);

// index가 0인 node의 하위로 이동하며 순서는 가장 첫번째로 이동
tree.moveNode(0, "first");

// index가 0인 node의 부모 node의 하위로 이동하며 순서는 index가 0인 node의 앞으로 이동
tree.moveNode(0, "before");

// index가 0인 node의 부모 node의 하위로 이동하며 순서는 index가 2인 node의 뒤로 이동
tree.moveNode(0, "after", tree.getNode(2));
```



# Node 요소 메소드

Node 요소 메소드는 실제 웹사이트에 생성된 Node 요소와 관련된 역할을 수행합니다.

Node 요소 메소드는 다음과 같습니다.

1. getNodeId
2. getNodeElement
3. getMain
4. getMainLeft
5. getMainMiddle
6. getMainRight
7. getSub

각 메소드들에 대한 상세 설명은 다음과 같습니다.

## getNodeId

`getNodeId` 메소드는 Node의 요소 id를 반환하는 메소드입니다.

### 반환 값
- `{string}` - node id

### 사용 예시

```javascript
// node 예시
let node = tree.getSelectedNode();

// 선택된 node의 id 반환
node.getNodeId();
```


## getNodeElement
## getMain
## getMainLeft
## getMainMiddle
## getMainRight
## getSub

이 메소드들은 Node의 특정 요소들을 반환하는 메소드입니다. 반환되는 요소들은 다음과 같습니다.

- **getNodeElement**: node 전체 요소
- **getMain**: node의 main 영역 요소
- **getMainLeft**: node의 main-left 영역 요소
- **getMainMiddle**: node의 main-middle 영역 요소
- **getMainRight**: node의 main-right 영역 요소
- **getSub**: node의 sub 영역 요소

### 반환 값
- `{element}` - 각 요소

### 사용 예시

```javascript
// node 예시
let node = tree.getSelectedNode();

// node 전체 요소 반환
node.getNodeElement();

// node의 main 영역 요소 반환
node.getMain();

// node의 main-left 영역 요소 반환
node.getMainLeft();

// node의 main-middle 영역 요소 반환
node.getMainMiddle();

// node의 main-right 영역 요소 반환
node.getMainRight();

// node의 sub 영역 요소 반환
node.getSub();
```


# Node 데이터 메소드

Node 데이터 메소드는 실제 웹사이트에 생성된 Node 요소와 관련된 역할을 수행합니다.

Node 데이터 메소드는 다음과 같습니다.

1. getData
2. getNodeValue
3. setNodeValue
4. getFlag
5. addNode
6. removeNode

각 메소드들에 대한 상세 설명은 다음과 같습니다.


## getData

`getData` 메소드는 Node의 전체 데이터를 반환하는 메소드입니다.

### 반환 값
- `{array}` - node data: node의 데이터는 JSON 형식으로 이루어져 있습니다.

### 사용 예시

```javascript
// node 예시
let node = tree.getSelectedNode();

// node 데이터 반환
node.getData();
```

## getNodeValue

`getNodeValue` 메소드는 Node의 column명에 해당하는 데이터를 반환하는 메소드입니다.

### 매개변수
- `{string} column명`: 데이터를 가져오려는 column명.

### 반환 값
- `{string} value`: 해당 column명에 해당하는 값.

### 사용 예시

```javascript
// node 예시
let node = tree.getSelectedNode();

// column명이 'COL'인 데이터 반환
node.getNodeValue("COL");
```


## setNodeValue

`setNodeValue` 메소드는 Node의 column명의 데이터를 새 값으로 변경하는 메소드입니다. 이때, Node의 `IUDFLAG`는 `U`로 변경됩니다.

- 만약 column명이 `idColumn`과 동일할 경우, 하위 노드들의 `upIdColumn`의 데이터들도 변경되며 `IUDFLAG`도 `U`로 변경됩니다.
- 만약 column명이 `upIdColumn`과 동일할 경우, 해당 `upIdColumn`의 하위 노드로 이동합니다. (이동을 원하지 않으면 `moveNode` 플래그를 `false`로 설정)
- 변경이 불가능할 경우, 실패 플래그를 발생시키며 오류 메시지를 띄웁니다.

### 매개변수
- `{string} column명`: 변경하려는 column명의 이름.
- `{string} new value`: 새로운 값.
- `{boolean} moveNode flag`: 노드를 이동할지 여부 (기본값은 `true`).

### 반환 값
- `{number}`: 실패 시 실패 코드 반환, 성공 시 `0` 반환.

### 사용 예시

```javascript
// node 예시
let node = tree.getSelectedNode();

// column명이 'COL'인 데이터를 'new data'로 변경
node.setNodeValue("COL", "new data");
```


## getFlag

`getFlag` 메소드는 입력한 Node의 `IUDFLAG` 값을 반환하는 메소드입니다.

### 반환 값
- `{string}`: Node의 `IUDFLAG` 값.

### 사용 예시

```javascript
// node 예시
let node = tree.getSelectedNode();

// node의 IUDFLAG 값을 반환
node.getFlag();
```


## addNode

`addNode` 메소드는 Node 하위에 새로운 Node를 추가하는 메소드입니다. 새로운 Node에 데이터를 넣어 추가하고 싶은 경우, `new data`를 추가할 수 있습니다.

### 파라미터
- `{json}` `new data`: 추가할 Node의 데이터.

### 반환 값
- `{number}`: 실패 시 실패 코드, 성공 시 `0` 반환.

### 사용 예시

```javascript
// node 예시
let node = tree.getSelectedNode();

// 하위에 새로운 Node 추가
node.addNode();

// data를 추가하여 새로운 Node 추가
let addData = {
    "SN": 1,
    "UP_SN": 0,
    "LABEL_NM": "new node",
    "ORDER_NO": 0
};

node.addNode(addData);
```


## removeNode

`removeNode` 메소드는 Node를 삭제하는 메소드입니다. 삭제된 Node는 `IUDFLAG`가 `D`로 변경되며, 화면에서 해당 Node가 삭제됩니다.

### 사용 예시

```javascript
// node 예시
let node = tree.getSelectedNode();

// Node 삭제
node.removeNode();
```