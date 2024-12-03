# Node

Node 영역은 각 Node의 **데이터**, **상태** 등 **개별 Node와 관련된 정보**를 담고 있는 영역입니다.

## 구조

`Node`는 크게 **Main 영역**과 **Sub 영역**으로 구분됩니다.

### Node 구조 도식화
Node의 전체적인 구조는 아래와 같습니다:

```plaintext
Node
├── Main
│   ├── Left (여닫기 버튼, 이동 핸들, 좌측 버튼, 체크박스)
│   ├── Middle (Label 정보)
│   └── Right (우측 버튼, 체크박스)
└── Sub (하위 Node)
```

### 1. Main 영역

`Main` 영역은 해당 Node의 **Label 정보**와 **여닫기 버튼**이 필수적으로 포함된 영역입니다.  
옵션에 따라 다음과 같은 요소들이 추가될 수 있습니다:
- 이동 핸들
- 좌측 버튼
- 우측 버튼
- 체크박스

`Main` 영역은 **Left, Middle, Right** 세 영역으로 세분화됩니다:

- **Left 영역**:  
    여닫기 버튼, 이동 핸들, 좌측 버튼, 체크박스(좌) 포함
- **Middle 영역**:  
    Node의 Label 정보 포함
- **Right 영역**:  
    우측 버튼, 체크박스(우) 포함


### 2. Sub 영역

`Sub` 영역은 해당 Node의 하위 Node들을 포함하는 영역입니다.

## Node의 주요 특징

- 각 Node는 **unique한 index**를 가지고 있습니다.
- 트리에서 `index`를 사용하여 Node에 접근할 수 있습니다.

## Node 메소드

Node 메소드은 총 23개의 다양한 메소드들로 이루어져있습니다.

1. Node 정보 메소드 (5개 메소드)
2. Node 동작 메소드 (5개 메소드)
3. Node 요소 메소드 (7개 메소드)
4. Node 데이터 메소드 (6개 메소드)

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


