# Tree

`Tree`는 HjsTree의 **속성** 이나 **Tree 안 Node**, **Tree 데이터** 같은 Tree와 관련된 전체적인 정보들을 담고 있습니다.

## 구조

`Tree`에는 `Node`들이 포합되어 있습니다. 

```plaintext
Tree
└── Root Node
    ├── Depth1 Node
    │   ├── Depth2 Node
    │   └── ...
    ├── Depth1 Node
    └── ...
```

## Tree 메소드

Tree 메소드는 주로 Tree 전체에서 동작하는 메소드입니다.
트리를 펼쳤다, 접었다 하거나, 
선택된 Node들의 정보를 전부 가져오거나 하는 메소드들이 이에 해당합니다.

Tree메소드에서도 Node메소드와 유사한 기능을 최대한 수행할 수 있도록 개발을 진행하였습니다.
이는 사용자가 HjsTree의 Tree를 기준으로 접근하느냐 Node를 기준으로 접근하느냐에 따라서 여러 속성을 제공하고자 함입니다.
사용자는 그때그때 자신이 필요로하는 메소드를 선택하여 개발하면 됩니다.

Tree 메소드은 총 42개의 다양한 메소드들로 이루어져있습니다.

각 메소드를 기능별로 구분해보면 다음과 같이 분류됩니다.

1. 초기화 및 속성 관련 메소드 (13개 메소드)
2. Tree 동작 메소드 (11개 메소드)
3. Node 관련 메소드 (13개 메소드)
4. data관련 메소드 (5개 메소드)

| **분류**                   | **메소드**                                                | **설명**                                      |
|----------------------------|----------------------------------------------------------|-----------------------------------------------|
| **초기화 및 속성 관련 메소드** | 1. [init](./Methods.md#init)                              | 트리를 초기화합니다.                           |
|                            | 2. [getIdColumn](./Methods.md#getIdColumn)               | ID 컬럼을 가져옵니다.                          |
|                            | 3. [getUpIdColumn](./Methods.md#getUpIdColumn)           | 부모 ID 컬럼을 가져옵니다.                     |
|                            | 4. [setEditable](./Methods.md#setEditable)               | 트리를 편집 가능하도록 설정합니다.              |
|                            | 5. [setSelectable](./Methods.md#setSelectable)           | 선택 가능 여부를 설정합니다.                   |
|                            | 6. [setDraggable](./Methods.md#setDraggable)             | 드래그 가능 여부를 설정합니다.                 |
|                            | 7. [setCheckbox](./Methods.md#setCheckbox)               | 체크박스 사용 여부를 설정합니다.               |
|                            | 8. [setDefaultNodeId](./Methods.md#setDefaultNodeId)     | 기본 Node ID를 설정합니다.                     |
|                            | 9. [setDataset](./Methods.md#setDataset)                 | 데이터를 설정합니다.                           |
|                            | 10. [addRightBtn](./Methods.md#addRightBtn)             | 오른쪽 버튼을 추가합니다.                      |
|                            | 11. [removeRightBtn](./Methods.md#removeRightBtn)       | 오른쪽 버튼을 제거합니다.                      |
|                            | 12. [addLeftBtn](./Methods.md#addLeftBtn)               | 왼쪽 버튼을 추가합니다.                        |
|                            | 13. [removeLeftBtn](./Methods.md#removeLeftBtn)         | 왼쪽 버튼을 제거합니다.                        |
| **Node 동작 메소드**        | 1. [expandNode](./Methods.md#expandNode)                | Node를 확장합니다.                             |
|                            | 2. [collapseNode](./Methods.md#collapseNode)            | Node를 축소합니다.                             |
|                            | 3. [toggleNode](./Methods.md#toggleNode)                | Node의 상태를 토글합니다.                      |
|                            | 4. [selectNode](./Methods.md#selectNode)                | Node를 선택합니다.                             |
|                            | 5. [moveNode](./Methods.md#moveNode)                    | Node를 이동시킵니다.                           |
| **트리 동작 메소드**        | 1. [expandNode](./Methods.md#expandNode)                | 특정 Node를 확장합니다.                        |
|                            | 2. [expandNodeAll](./Methods.md#expandNodeAll)          | 모든 Node를 확장합니다.                        |
|                            | 3. [collapseNode](./Methods.md#collapseNode)            | 특정 Node를 축소합니다.                        |
|                            | 4. [collapseNodeAll](./Methods.md#collapseNodeAll)      | 모든 Node를 축소합니다.                        |
|                            | 5. [openNode](./Methods.md#openNode)                    | 특정 Node를 엽니다.                            |
|                            | 6. [openNodeByDepth](./Methods.md#openNodeByDepth)      | 특정 depth까지 Node를 엽니다.                   |
|                            | 7. [checkNode](./Methods.md#checkNode)                  | Node의 체크박스를 체크합니다.                  |
|                            | 8. [unCheckNode](./Methods.md#unCheckNode)              | Node의 체크박스 체크 해제합니다.               |
|                            | 9. [toggleCheckNode](./Methods.md#toggleCheckNode)      | Node의 체크박스 체크 상태를 토글합니다.        |
|                            | 10. [selectNode](./Methods.md#selectNode)              | Node를 선택합니다.                             |
|                            | 11. [getDepth](./Methods.md#getDepth)                   | 특정 Node의 depth를 가져옵니다.                 |
| **Node 관련 메소드**        | 1. [getIndexById](./Methods.md#getIndexById)            | ID로 Node의 인덱스를 가져옵니다.               |
|                            | 2. [getIndexByNode](./Methods.md#getIndexByNode)        | Node 객체로 인덱스를 가져옵니다.               |
|                            | 3. [getIndexByElement](./Methods.md#getIndexByElement)  | DOM 요소로 Node의 인덱스를 가져옵니다.         |
|                            | 4. [getId](./Methods.md#getId)                          | Node의 ID를 가져옵니다.                        |
|                            | 5. [getUpId](./Methods.md#getUpId)                      | 부모 Node의 ID를 가져옵니다.                   |
|                            | 6. [getNode](./Methods.md#getNode)                      | Node 객체를 가져옵니다.                        |
|                            | 7. [getUpNode](./Methods.md#getUpNode)                  | 부모 Node를 가져옵니다.                        |
|                            | 8. [getCheckedNode](./Methods.md#getCheckedNode)        | 체크된 Node를 가져옵니다.                      |
|                            | 9. [getSelectedNode](./Methods.md#getSelectedNode)      | 선택된 단일 Node를 가져옵니다.                 |
|                            | 10. [getSelectedNodes](./Methods.md#getSelectedNodes)   | 선택된 모든 Node를 가져옵니다.                 |
|                            | 11. [searchNode](./Methods.md#searchNode)              | 특정 조건에 맞는 Node를 검색합니다.            |
|                            | 12. [moveNode](./Methods.md#moveNode)                  | Node를 이동시킵니다.                           |
|                            | 13. [hasChild](./Methods.md#hasChild)                  | Node가 자식을 가지고 있는지 확인합니다.         |
|                            | 14. [getCheckedNode](./Methods.md#getCheckedNode)       | 체크된 Node 목록을 가져옵니다.                 |
| **Data 관련 메소드**        | 1. [getData](./Methods.md#getData)                      | Node의 데이터를 가져옵니다.                    |
|                            | 2. [getNodeValue](./Methods.md#getNodeValue)            | Node의 값을 가져옵니다.                        |
|                            | 3. [setNodeValue](./Methods.md#setNodeValue)            | Node의 값을 설정합니다.                        |
|                            | 4. [addNode](./Methods.md#addNode)                      | 새로운 Node를 추가합니다.                      |
|                            | 5. [removeNode](./Methods.md#removeNode)                | Node를 삭제합니다.                             |

