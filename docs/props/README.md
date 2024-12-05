# HjsTree 옵션 설명

HjsTree의 주요 옵션들을 설명합니다.

## selector

`selector`는 HjsTree 생성 위치를 지정해주는 옵션입니다.

## treeData

`treeData`는 HjsTree에서 사용될 데이터를 지정해주는 옵션입니다.  

### treeData 구조 예시
```javascript
let treeData = [
    { "UP_SN": 0, "SN": 1, "ORDER_NO": 0, "LABEL_NM": "1" },
    { "UP_SN": 0, "SN": 2, "ORDER_NO": 1, "LABEL_NM": "2" },
    { "UP_SN": 2, "SN": 3, "ORDER_NO": 1, "LABEL_NM": "2-1" },
    { "UP_SN": 2, "SN": 4, "ORDER_NO": 2, "LABEL_NM": "2-2" },
];
```
데이터는 위와 같이 트리구조를 이루고 있는 데이터여야 합니다.
`treeData`는 배열이며, 각 요소로 JSON 데이터를 가집니다.
JSON 데이터의 key값은 컬럼명, value값은 데이터입니다.

## idColumn

`idColumn`은 treeData가 Tree 구성을 갖추는 데 키값이 되는 Column 명을 지정해주는 옵션입니다.

## upIdColumn

`upIdColumn`은 상위 Node의 Tree 키 값을 갖는 Column명을 지정해주는 옵션입니다.

## labelColumn

`labelColumn`은 트리의 Main 영역 - label 정보에 표시될 데이터를 가진 Column을 지정해주는 옵션입니다.  
`labelColumn`는 단수 또는 복수로 지정할 수 있습니다.

### 사용 예시
```javascript
// labelColumn을 단수로 지정하는 경우
labelColumn: "LABEL_NM";

// labelColumn을 복수로 지정하는 경우
labelColumn: ["LABEL_NM", "LABEL_NM_2", "LABEL_NM_3"];
```

## labelOption

`labelOption`은 컬럼별로 label에 관한 여러 옵션을 지정해주는 옵션입니다.  

`labelOption`은 다음과 같은 구조을 가지고 있습니다.

**구조 예시**
```json
"labelOption" : {
    "컬럼명" : {     
        "condition"         : function,    
        "tagName"           : string,
        "maxDepth"          : number,
        "minDepth"          : number,
        "selectCodeColumn"  : string,
        "selectNameColumn"  : string,
        "selectData"        : array
    }
}
```

`labelOption`은 다음과 같은 상세 옵션을 가지고 있습니다.

1. **condition**
    - 조건에 따라 각 컬럼의 editable을 조정할 수 있습니다.
        조건 function의 true, false 값에 따라 editable 상태가 변화합니다.
    - @type {function}
    - @param {HjsTreeNode} 선택된 node
<br>

2. **tagName**
    - 수정하는 editor의 태그명을 조정할 수 있습니다.
    - @type {string}
<br> 

3. **maxDepth**
    - depth가 0인 최상단 노드부터 maxDepth 값 까지 표출합니다.
    - @type {number}
<br>

4. **minDepth**
    - minDepth값의 node부터 최하단 노드까지 표출합니다.
    - @type {number}
<br>

5. **selectCodeColumn**
    - tagName이 select일 시(combobox) 사용하는 옵션으로, select의 code값을 담당하는 컬럼명을 지정할 수 있습니다.
    - @type {string}

<br>

6. **selectNameColumn**
    - tagName이 select일 시(combobox) 사용하는 옵션으로, select의 name값을 담당하는 컬럼명을 지정할 수 있습니다.
    - @type {string}
<br>

7. **selectData**
    - tagName이 select일 시(combobox) 사용하는 옵션으로, select 안의 data를 지정할 수 있습니다.
    - @type {array}
    **구조 예시**
    ```json
    "selectData" : [
        {
            "selectCodeColumn 값" : value,
            "selectNameColumn 값" : value,
        }
    ]
    ```

- **select 사용 예시**
```json
"labelOption" : {
    "컬럼명" : { 
        "tagName"   : "select",
        "selectCodeColumn" : "code",
        "selectNameColumn" : "name",
        "selectData" : [
            {   
                "code" : "1",
                "name" : "일",
            },
            {   
                "code" : "2",
                "name" : "이",
            }
        ]
    }
}
```


## rootName

`rootName`은 root 레벨의 node들이 갖는 tree의 키 값을 지정하는 옵션입니다.  
`rootName`을 따로 지정하지 않을 시 기본 값은 `"tree-root"`로 설정됩니다.

## orderColumn

`orderColumn`은 tree 내에서 순서를 나타내는 column의 column명을 지정하는 옵션입니다.  
`orderColumn`을 따로 지정하지 않을 시 기본 값은 `"TREE_ORDER"`로 설정됩니다.

## defaultNodeId

`defaultNodeId`는 각 Node의 HTML 요소 ID값을 지정하는 옵션입니다.  
`defaultNodeId`를 따로 지정하지 않을 시 기본 값은 `"treenode"`입니다.

**Node의 HTML 요소 ID는** `defaultNodeId + "_" + Node Index` 입니다.

## checkbox

`checkbox`는 Node에 checkbox를 생성할 지 지정하는 옵션입니다.  
`checkbox`를 따로 지정하지 않으면 checkbox는 생성되지 않습니다.

`checkbox`는 세 가지 옵션을 갖습니다:
- `left` : Node의 Main-Left 영역에 checkbox가 생성됩니다.
- `right` : Node의 Main-Right 영역에 checkbox가 생성됩니다.
- `both` : Node의 Main-Left 영역과 Main-Right 영역 모두에 checkbox가 생성됩니다.

**예시:**
```javascript
checkbox: "left"  // "right" | "both"
```

## checkboxColumn

`checkboxColumn`은 tree의 checkbox가 `left`, `right`, `both`일 때 사용할 수 있는 옵션입니다.  
`checkboxColumn`은 checkbox에 bind될 column의 id를 지정하여 사용합니다.

- `left` 또는 `right`일 경우, 단수 사용
- `both`일 경우, 단수 및 복수 모두 사용 가능합니다.

**예시:**
```javascript
// checkbox 옵션이 left나 right일 경우, 단수 사용
checkbox: "left" | "right",
checkboxColumn: "CHK",

// checkbox 옵션이 both일 경우, 단수, 복수 모두 사용 가능
// 단수 사용 시 양쪽 모두 같은 dataset bind (권장하지 않음)
checkbox: "both",
checkboxColumn: "CHK",

// 복수 사용 시 첫 번째 column은 left, 두 번째 column은 right에 bind
checkbox: "both",
checkboxColumn: ["CHK", "CHK1"],
```

## checkTrueValue
## checkFalseValue

`checkTrueValue`와 `checkFalseValue`는 tree의 checkbox가 `left`, `right`, `both`일 때, `checkboxColumn`이 있을 경우 사용할 수 있는 옵션입니다.

- `checkTrueValue`는 checkbox가 체크된 경우, `checkboxColumn`이 갖는 값입니다.
- `checkFalseValue`는 checkbox가 체크되지 않은 경우, `checkboxColumn`이 갖는 값입니다.

이 두 옵션은 단수와 복수로 설정할 수 있습니다.

### 예시:

```javascript
// checkbox 옵션이 left나 right일 경우, 단수 사용
checkbox: "left" | "right",
checkboxColumn: "CHK",
checkTrueValue: "Y",
checkFalseValue: "N",

// checkbox 옵션이 both일 경우, 단수, 복수 모두 사용 가능
checkbox: "both",
checkboxColumn: "CHK",
checkTrueValue: "Y",
checkFalseValue: "N",

// 복수 사용 시 첫 번째 column은 left, 두 번째 column은 right에 bind
checkbox: "both",
checkboxColumn: ["CHK", "CHK1"],
checkTrueValue: ["Y", 1],
checkFalseValue: ["N", 0],
```

## checkEvent

`checkEvent`는 tree의 checkbox가 `left`, `right`, `both`일 때 사용할 수 있는 옵션입니다.

`checkEvent`는 tree checkbox를 클릭 시 발생하는 event를 지정해주는 옵션입니다. 

- `checkEvent`는 checkbox가 `left`나 `right`일 경우에는 단수로 설정하고,
- checkbox가 `both`일 경우에는 단수와 복수 모두 설정할 수 있습니다.

### 예시:

```javascript
let checkEvent1 = function(myObj, event) {
    alert("checkEvent1");
}

let checkEvent2 = function(myObj, event) {
    alert("checkEvent2");
}

// checkbox 옵션이 left나 right일 경우, 단수 사용
checkbox: "left" | "right",
checkEvent: checkEvent1,

// checkbox 옵션이 both일 경우, 단수, 복수 모두 사용 가능
checkbox: "both",
checkEvent: checkEvent1,

// 복수 사용 시 첫 번째 column은 left, 두 번째 column은 right에 event 추가
checkbox: "both",
checkEvent: [checkEvent1, checkEvent2],
```

## leftBtn

`leftBtn`은 Node의 Main-Left 영역에 버튼을 생성할 지 지정하는 옵션입니다.  
`leftBtn`을 따로 지정하지 않으면 버튼은 생성되지 않습니다.

`leftBtn`은 `함수` 또는 `버튼 옵션`을 옵션값으로 갖습니다.  
`leftBtn`은 배열에 담아서 상태값을 전달합니다.  

`leftBtn`에는 번호가 붙습니다. 
해당 번호는 왼쪽부터 시작하며, 0부터 시작합니다.

**예시:**
```javascript
leftBtn: [clickLeftBtn1]  // ["clickLeftBtn1", "clickLeftBtn2"]

leftBtn : [
    {
        "innerText" : string,
        "tagName"   : string,
        "class"     : array,
        "condition" : function,
        "maxDepth"  : number,
        "minDepth"  : number,
        "event"     : {
            "event 명" : function // 이벤트 함수
        }
    }
]
```

1. **innerText**
    - 버튼 안에 들어갈 text를 지정합니다.
    - @type {string}
<br>

2. **tagName**
    - 버튼의 태그명을 조정할 수 있습니다.
    - @type {string}
<br> 

3. **class**
    - 버튼에 추가할 class명을 지정합니다.
    - @type {array}
<br>

4. **condition**
    - 조건에 따라 버튼의 표출여부를 조정할 수 있습니다.
        조건 function의 true, false 값에 따라 표출여부가 변화합니다.
    - @type {function}
    - @param {HjsTreeNode} 선택된 node
<br>

5. **maxDepth**
    - depth가 0인 최상단 노드부터 maxDepth 값 까지 표출합니다.
    - @type {number}
<br>

6. **minDepth**
    - minDepth값의 node부터 최하단 노드까지 표출합니다.
    - @type {number}
<br>

7. **event**
    - 버튼의 이벤트를 제어합니다. 다양한 이벤트를 key로, 이벤트 동작 함수를 value로 하는 json 데이터를 입력해줍니다.
    - @type {json}
    - value function param
        - @param {event} Native Event
        - @param {HjsTreeNode} 선택된 node

    **구조 예시**
    ```javascript
    "event" : [
        "click" : (e,node)=>alert("I'm click!"),
        "mouseover" : (e,node)=>alert("mouseover")
        ...
    ]
    ```
    

## rightBtn

`rightBtn`은 Node의 Main-Right 영역에 버튼을 생성할지 지정하는 옵션입니다.  
`rightBtn`을 따로 지정하지 않으면 버튼은 생성되지 않습니다.

`rightBtn`은 `함수` 또는 `버튼 옵션`을 옵션값으로 갖습니다.  
`rightBtn`은 배열에 담아서 상태값을 전달합니다.

`rightBtn`에는 숫자가 붙습니다.  
해당 숫자는 왼쪽부터 시작하며, 0부터 시작합니다.

**예시:**
```javascript
rightBtn: [clickRightBtn1]  // [clickRightBtn1, clickRightBtn2]

rightBtn : [
    {
        "innerText" : string,
        "tagName"   : string,
        "class"     : array,
        "condition" : function,
        "maxDepth"  : number,
        "minDepth"  : number,
        "event"     : {
            "event 명" : function // 이벤트 함수
        }
    }
]
```

1. **innerText**
    - 버튼 안에 들어갈 text를 지정합니다.
    - @type {string}
<br>

2. **tagName**
    - 버튼의 태그명을 조정할 수 있습니다.
    - @type {string}
<br> 

3. **class**
    - 버튼에 추가할 class명을 지정합니다.
    - @type {array}
<br>

4. **condition**
    - 조건에 따라 버튼의 표출여부를 조정할 수 있습니다.
        조건 function의 true, false 값에 따라 표출여부가 변화합니다.
    - @type {function}
    - @param {HjsTreeNode} 선택된 node
<br>

5. **maxDepth**
    - depth가 0인 최상단 노드부터 maxDepth 값 까지 표출합니다.
    - @type {number}
<br>

6. **minDepth**
    - minDepth값의 node부터 최하단 노드까지 표출합니다.
    - @type {number}
<br>

7. **event**
    - 버튼의 이벤트를 제어합니다. 다양한 이벤트를 key로, 이벤트 동작 함수를 value로 하는 json 데이터를 입력해줍니다.
    - @type {json}
    - value function param
        - @param {event} Native Event
        - @param {HjsTreeNode} 선택된 node

    **구조 예시**
    ```javascript
    "event" : [
        "click" : (e,node)=>alert("I'm click!"),
        "mouseover" : (e,node)=>alert("mouseover")
        ...
    ]
    ```

## dataset

`dataset`은 bind할 dataset을 지정하는 옵션입니다. 

dataset 옵션이 있을 경우, selectable 옵션은 항상 true입니다.

아래와 같은 규칙이 있는 html 요소를 참조합니다.

```html
<input name="[dataset명]_[id명]"/>
```

해당 `dataset`을 bind시킨 field가 있을 경우, field의 값이 변경되면 tree의 data 값도 함께 변경됩니다.


## editable

`editable`은 tree에서 label 정보를 수정할 수 있는지 여부를 지정하는 옵션입니다.  
`editable`을 지정하지 않으면, 기본 값은 `false`로 설정됩니다.

`editable`은 `true`와 `false`로 설정할 수 있습니다.

`editable` 옵션을 사용하면, tree data도 자동으로 변경되며 해당 로우의 IUDFLAG 값도 함께 변경됩니다.

`dataset` 옵션과 함께 사용할 경우, bind되어 있는 field의 값도 함께 변경됩니다.

**예시:**
```html
<script>
    let editableSampleTree = new HjsTree();

    let sampleData1 = [
        {
            "UP_SN": 0,
            "SN": 1,
            "ORDER_NO": 0,
            "MENU_NM": "sample data 1"
        }, {
            "UP_SN": 0,
            "SN": 2,
            "ORDER_NO": 0,
            "MENU_NM": "sample data 2"
        }, {
            "UP_SN": 2,
            "SN": 3,
            "ORDER_NO": 0,
            "MENU_NM": "sample data 3"
        }
    ];
    
    editableSampleTree.init({
        selector: "#editable_div",
        treeData: sampleData1,
        idColumn: "SN",
        upIdColumn: "UP_SN",
        rootName: "0",
        orderColumn: "ORDER_NO",
        labelColumn: "MENU_NM",
        dataset: "EDITABLE",
        editable: true
    })
</script>

<div id="editable_div"></div>
<input id="EDITABLE_input">
```

## editOption

`editOption`은 tree가 `editable` 옵션이 `true`일 때, 다양한 설정을 통해 각 컬럼 별 `editOption`을 제어할 수 있는 옵션입니다.

`editOption`은 다음과 같은 구조을 가지고 있습니다.

**구조 예시**
```json
"editOption" : {
    "컬럼명" : {
        "editable"  : boolean,      
        "condition" : function,    
        "tagName"   : string,
        "directEdit": boolean,
        "selectCodeColumn" : string,
        "selectNameColumn" : string,
        "selectData" : array
    }
}
```

`editOption`은 다음과 같은 상세 옵션을 가지고 있습니다.

1. **editable**
    - 각 컬럼의 editable을 조정할 수 있습니다.
    - @type {boolean}
<br>

2. **condition**
    - 조건에 따라 각 컬럼의 editable을 조정할 수 있습니다.
        조건 function의 true, false 값에 따라 editable 상태가 변화합니다.
    - @type {function}
    - @param {HjsTreeNode} 선택된 node
<br>

3. **tagName**
    - 수정하는 editor의 태그명을 조정할 수 있습니다.
    - @type {string}
<br>   

4. **directEdit**
    - 클릭하지 않고도 바로 수정할 수 있도록 editor를 띄웁니다.
    - @type {boolean}
<br>   

5. **selectCodeColumn**
    - tagName이 select일 시(combobox) 사용하는 옵션으로, select의 code값을 담당하는 컬럼명을 지정할 수 있습니다.
    - @type {string}

<br>

6. **selectNameColumn**
    - tagName이 select일 시(combobox) 사용하는 옵션으로, select의 name값을 담당하는 컬럼명을 지정할 수 있습니다.
    - @type {string}
<br>

7. **selectData**
    - tagName이 select일 시(combobox) 사용하는 옵션으로, select 안의 data를 지정할 수 있습니다.
    - @type {array}
    **구조 예시**
    ```json
    "selectData" : [
        {
            "selectCodeColumn 값" : value,
            "selectNameColumn 값" : value,
        }
    ]
    ```

- **select 사용 예시**
```json
"editOption" : {
    "컬럼명" : { 
        "tagName"   : "select",
        "selectCodeColumn" : "code",
        "selectNameColumn" : "name",
        "selectData" : [
            {   
                "code" : "1",
                "name" : "일",
            },
            {   
                "code" : "2",
                "name" : "이",
            }
        ]
    }
}
```


## draggable

`draggable`은 node를 드래그하여 움직일 수 있는지 여부를 지정하는 옵션입니다.  
`draggable`을 지정하지 않으면, 기본 값은 `false`로 설정됩니다.

`draggable`은 `true`와 `false`로 설정할 수 있습니다.

`draggable`이 `true`일 경우, Node의 Main-Left 영역에 드래그할 수 있는 핸들이 생성됩니다.  
해당 핸들을 이용해 Node를 드래그하여 이동시킬 수 있습니다.

드래그 중인 Node가 다른 Node 위를 지날 경우, 해당 Node 주변에 3개의 `div`가 생성됩니다.  
각각의 `div`는 다음과 같은 역할을 합니다:

- **1번 div**: 해당 노드와 같은 depth이면서 순서가 한 단계 빠른 위치로 이동합니다.
- **2번 div**: 해당 노드와 같은 depth이면서 순서가 한 단계 늦은 위치로 이동합니다.
- **3번 div**: 해당 노드의 자식 노드로 이동하며, 자식 노드에서의 순서는 맨 마지막입니다.

노드가 이동하면서 변경되는 tree 구조에 따라 tree의 데이터도 함께 변경됩니다.

**예시:**
```html
<script>
    let draggableSampleTree = new HjsTree();

    let sampleData1 = [
        {
            "UP_SN": 0,
            "SN": 1,
            "ORDER_NO": 0,
            "MENU_NM": "sample data 1"
        }, {
            "UP_SN": 0,
            "SN": 2,
            "ORDER_NO": 0,
            "MENU_NM": "sample data 2"
        }, {
            "UP_SN": 2,
            "SN": 3,
            "ORDER_NO": 0,
            "MENU_NM": "sample data 3"
        }
    ];
    
    draggableSampleTree.init({
        selector: "#draggable_div",
        treeData: sampleData1,
        idColumn: "SN",
        upIdColumn: "UP_SN",
        orderColumn: "ORDER_NO",
        labelColumn: "MENU_NM",
        draggable: true
    })
</script>

<div id="draggable_div"></div>
```

## dragOption

`dragOption`은 tree가 `draggable` 옵션이 `true`일 때, 다양한 설정을 통해 `dragOption`을 제어할 수 있는 옵션입니다.

`dragOption`은 다음과 같은 구조을 가지고 있습니다.

**구조 예시**
```json
"dragOption" : {
    "moveParent": boolean,
    "maxDepth"  : number,
    "minDepth"  : number,
}
```

`dragOption`은 다음과 같은 상세 옵션을 가지고 있습니다.

1. **moveParent**
    - 부모 node로 이동할 수 있는지 여부를 제어할 수 있습니다. moveParent가 false일 경우, 자신의 부모 아래에서만 이동이 가능합니다.
    - @type {boolean}
<br> 

2. **maxDepth**
    - depth가 0인 최상단 노드부터 maxDepth 값 까지 drag handle을 표출합니다.
    - @type {number}
<br>

3. **minDepth**
    - minDepth값의 node부터 최하단 노드까지 drag handle을 표출합니다.
    - @type {number}
<br>


## selectable

`selectable`은 tree를 선택할 수 있는지 여부를 지정하는 옵션입니다.  
`selectable`을 지정하지 않으면, 기본 값은 `false`로 설정됩니다.

`selectable`은 `true`와 `false`로 설정할 수 있습니다.

`selectable`이 `true`일 경우, 사용자는 Node를 클릭하여 선택할 수 있습니다.  
또한, 왼쪽 `Ctrl` 키와 함께 클릭하면 다중 선택도 가능합니다.

dataset 옵션이 있을 경우, selectable 옵션은 항상 true입니다.

**예시:**
```html
<script>
    let selectableSampleTree = new HjsTree();

    let sampleData1 = [
        {
            "UP_SN": 0,
            "SN": 1,
            "ORDER_NO": 0,
            "MENU_NM": "sample data 1"
        }, {
            "UP_SN": 0,
            "SN": 2,
            "ORDER_NO": 0,
            "MENU_NM": "sample data 2"
        }, {
            "UP_SN": 2,
            "SN": 3,
            "ORDER_NO": 0,
            "MENU_NM": "sample data 3"
        }
    ];
    
    selectableSampleTree.init({
        selector: "#selectable_div",
        treeData: sampleData1,
        idColumn: "SN",
        upIdColumn: "UP_SN",
        orderColumn: "ORDER_NO",
        labelColumn: "MENU_NM",
        selectable: true
    })
</script>

<div id="selectable_div"></div>
```

## event

`event`는 tree에 이벤트를 추가할 지 여부를 지정하는 옵션입니다.  
`event`를 지정하지 않으면 별도로 지정되는 이벤트는 없습니다.

`event`의 옵션값은 JSON 데이터를 갖습니다.  
JSON 데이터의 key값은 event명, value값은 event function입니다.

**예시:**
```javascript
event: {
    click: treeClickFunction,
    mouseover: mouseOverFunction,
    mouseout: mouseOutFunction
}
```