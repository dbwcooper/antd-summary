# antd-summary
antd 使用的一些问题demo  
现在包括以下方面  
1. 如果修改antd 组件的默认样式(覆盖)
   在这方面发现了 styled-componets 这种全新的方式并添加了demo
   components/form (cssmodule的方式覆盖 global)  
   components/styled-components 一种新的cssinjs的方式
2. 路由url 信息错误情况下的处理方式 (不刷新页面)
    - url不带参数的情况 
    例如  
    ``` https://github.com/duanbowen ```  
    -> ``` https://github.com/duanbowen_error```  
    处理方式:  
    直接在总路由的配置文件的末尾设置一个page404的路由  
    ```
     <Switch>
        <Route path="/" exact component={myForm} />
        <Route path="/cssmodule" exact component={cssmodule} />
        <Route path="/styled" exact component={styled} />
        {/* 路由未匹配时显示/ 未改变路由*/}
        <Route path="/*" exact component={Page404} />
      </Switch>
    ```  
    -  url 带有参数的情况  
    例如:  
    ``` https://github.com/duanbowen?status=1&detail=new```   
    ->  ``` https://github.com/duanbowen?status=1&detail=new_error```
    如果碰到这类情况的url 参数错误导致的路由错误  需要视情况而定   
    总的来说当前页面需要设置一个flag 在flag = true 的情况下显示导入的404组件 其他情况显示
    
