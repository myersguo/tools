export interface Template {
  name: string;
  code: string;
}

export interface Templates {
  mermaid: Template[];
  plantuml: Template[];
  graphviz: Template[];
  flowchart: Template[];
}

export const templates: Templates = {
  mermaid: [
    {
      name: '流程图',
      code: `graph TD
    A[开始] --> B{判断条件}
    B -->|是| C[执行操作1]
    B -->|否| D[执行操作2]
    C --> E[结束]
    D --> E`
    },
    {
      name: '时序图',
      code: `sequenceDiagram
    participant Alice
    participant Bob
    Alice->>Bob: 你好 Bob
    Bob->>Alice: 你好 Alice
    Alice->>Bob: 最近怎么样?
    Bob->>Alice: 很好，谢谢!`
    },
    {
      name: '类图',
      code: `classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +String breed
        +bark()
    }
    class Cat {
        +String color
        +meow()
    }
    Animal <|-- Dog
    Animal <|-- Cat`
    },
    {
      name: '状态图',
      code: `stateDiagram-v2
    [*] --> Still
    Still --> [*]
    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]`
    },
    {
      name: '实体关系图',
      code: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER {
        string name
        string custNumber
        string sector
    }
    ORDER {
        int orderNumber
        string deliveryAddress
    }
    LINE-ITEM {
        string productCode
        int quantity
        float pricePerUnit
    }`
    },
    {
      name: '甘特图',
      code: `gantt
    title 项目开发计划
    dateFormat  YYYY-MM-DD
    section 设计
    需求分析           :a1, 2024-01-01, 30d
    原型设计          :after a1, 20d
    section 开发
    前端开发          :2024-02-01, 40d
    后端开发          :2024-02-01, 45d
    section 测试
    集成测试          :2024-03-20, 15d
    上线部署          :2024-04-05, 5d`
    },
    {
      name: '饼图',
      code: `pie title 销售占比
    "产品A" : 386
    "产品B" : 85
    "产品C" : 150
    "产品D" : 50`
    },
    {
      name: 'Git 图',
      code: `gitGraph
    commit
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit
    commit`
    }
  ],
  plantuml: [
    {
      name: '时序图',
      code: `@startuml
Alice -> Bob: 认证请求
Bob --> Alice: 认证响应

Alice -> Bob: 另一个认证请求
Alice <-- Bob: 另一个认证响应
@enduml`
    },
    {
      name: '用例图',
      code: `@startuml
left to right direction
actor 用户 as user
actor 管理员 as admin

rectangle 系统 {
  usecase (登录) as UC1
  usecase (查看信息) as UC2
  usecase (编辑信息) as UC3
  usecase (删除信息) as UC4
}

user --> UC1
user --> UC2
admin --> UC1
admin --> UC2
admin --> UC3
admin --> UC4
@enduml`
    },
    {
      name: '类图',
      code: `@startuml
class Animal {
  - name: String
  - age: int
  + makeSound(): void
}

class Dog {
  - breed: String
  + bark(): void
}

class Cat {
  - color: String
  + meow(): void
}

Animal <|-- Dog
Animal <|-- Cat
@enduml`
    },
    {
      name: '活动图',
      code: `@startuml
start
:用户登录;
if (验证成功?) then (是)
  :显示主页;
  :用户操作;
  if (继续?) then (是)
    :处理请求;
  else (否)
    :退出登录;
  endif
else (否)
  :显示错误信息;
endif
stop
@enduml`
    },
    {
      name: '组件图',
      code: `@startuml
package "前端" {
  [Web界面]
  [移动应用]
}

package "后端" {
  [API网关]
  [业务逻辑]
  [数据访问]
}

database "数据库" {
  [MySQL]
}

[Web界面] --> [API网关]
[移动应用] --> [API网关]
[API网关] --> [业务逻辑]
[业务逻辑] --> [数据访问]
[数据访问] --> [MySQL]
@enduml`
    },
    {
      name: '状态图',
      code: `@startuml
[*] --> 待处理
待处理 --> 处理中 : 开始处理
处理中 --> 已完成 : 处理成功
处理中 --> 失败 : 处理失败
失败 --> 待处理 : 重试
已完成 --> [*]
@enduml`
    },
    {
      name: '对象图',
      code: `@startuml
object 用户1 {
  name = "张三"
  age = 25
}

object 订单1 {
  orderNo = "001"
  amount = 100.0
}

object 订单2 {
  orderNo = "002"
  amount = 200.0
}

用户1 --> 订单1
用户1 --> 订单2
@enduml`
    },
    {
      name: '部署图',
      code: `@startuml
node "Web服务器" {
  [Nginx]
  [应用服务]
}

node "应用服务器" {
  [业务逻辑]
  [缓存服务]
}

database "数据库服务器" {
  [MySQL主库]
  [MySQL从库]
}

[Nginx] --> [应用服务]
[应用服务] --> [业务逻辑]
[业务逻辑] --> [缓存服务]
[业务逻辑] --> [MySQL主库]
[MySQL主库] --> [MySQL从库] : 复制
@enduml`
    }
  ],
  graphviz: [
    {
      name: '有向图',
      code: `digraph G {
  rankdir=LR;
  node [shape=box, style=filled, fillcolor=lightblue];

  Start [fillcolor=lightgreen];
  End [fillcolor=lightcoral];

  Start -> Process1 [label="开始"];
  Process1 -> Decision [label="处理"];
  Decision -> Process2 [label="是"];
  Decision -> Process3 [label="否"];
  Process2 -> End;
  Process3 -> End;
}`
    },
    {
      name: '无向图',
      code: `graph G {
  node [shape=circle, style=filled, fillcolor=lightblue];

  A -- B;
  A -- C;
  B -- D;
  C -- D;
  C -- E;
  D -- E;
  E -- F;
}`
    },
    {
      name: '树形结构',
      code: `digraph Tree {
  node [shape=circle, style=filled, fillcolor=lightgreen];

  Root [label="根节点"];
  A [label="节点A"];
  B [label="节点B"];
  C [label="节点C"];
  D [label="节点D"];
  E [label="节点E"];
  F [label="节点F"];

  Root -> A;
  Root -> B;
  Root -> C;
  A -> D;
  A -> E;
  B -> F;
}`
    },
    {
      name: '网络图',
      code: `graph Network {
  node [shape=box, style=filled];

  Router [fillcolor=orange, label="路由器"];
  Switch [fillcolor=yellow, label="交换机"];
  Server1 [fillcolor=lightblue, label="服务器1"];
  Server2 [fillcolor=lightblue, label="服务器2"];
  PC1 [fillcolor=lightgreen, label="电脑1"];
  PC2 [fillcolor=lightgreen, label="电脑2"];
  PC3 [fillcolor=lightgreen, label="电脑3"];

  Router -- Switch;
  Switch -- Server1;
  Switch -- Server2;
  Switch -- PC1;
  Switch -- PC2;
  Switch -- PC3;
}`
    },
    {
      name: '层次结构',
      code: `digraph Hierarchy {
  rankdir=TB;
  node [shape=box, style=filled, fillcolor=lightblue];

  CEO [label="CEO", fillcolor=gold];
  CTO [label="CTO"];
  CFO [label="CFO"];
  Dev1 [label="开发1"];
  Dev2 [label="开发2"];
  QA [label="测试"];
  Finance [label="财务"];

  CEO -> CTO;
  CEO -> CFO;
  CTO -> Dev1;
  CTO -> Dev2;
  CTO -> QA;
  CFO -> Finance;
}`
    }
  ],
  flowchart: [
    {
      name: '基础流程图',
      code: `st=>start: 开始
op1=>operation: 操作1
cond=>condition: 判断条件?
op2=>operation: 操作2
op3=>operation: 操作3
e=>end: 结束

st->op1->cond
cond(yes)->op2->e
cond(no)->op3->e`
    },
    {
      name: '审批流程',
      code: `st=>start: 提交申请
op1=>operation: 填写表单
op2=>operation: 主管审批
cond1=>condition: 主管批准?
op3=>operation: 经理审批
cond2=>condition: 经理批准?
op4=>operation: 执行操作
op5=>operation: 驳回申请
e=>end: 结束

st->op1->op2->cond1
cond1(yes)->op3->cond2
cond1(no)->op5->e
cond2(yes)->op4->e
cond2(no)->op5`
    },
    {
      name: '登录流程',
      code: `st=>start: 用户访问
op1=>operation: 显示登录页
io=>inputoutput: 输入用户名密码
cond1=>condition: 验证成功?
op2=>operation: 显示主页
op3=>operation: 显示错误
cond2=>condition: 重试?
e=>end: 结束

st->op1->io->cond1
cond1(yes)->op2->e
cond1(no)->op3->cond2
cond2(yes)->io
cond2(no)->e`
    },
    {
      name: '订单处理',
      code: `st=>start: 收到订单
op1=>operation: 检查库存
cond1=>condition: 库存充足?
op2=>operation: 生成发货单
op3=>operation: 发货
op4=>operation: 通知缺货
cond2=>condition: 补货?
op5=>operation: 采购补货
e=>end: 结束

st->op1->cond1
cond1(yes)->op2->op3->e
cond1(no)->op4->cond2
cond2(yes)->op5->op1
cond2(no)->e`
    }
  ]
};
