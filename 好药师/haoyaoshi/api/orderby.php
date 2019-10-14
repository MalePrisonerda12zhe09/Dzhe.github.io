<?php
    include 'conn.php';

    $page = isset($_REQUEST['ipage']) ? $_REQUEST['ipage']: '';
    $num = isset($_REQUEST['num']) ? $_REQUEST['num']: '8';
    $paixu = isset($_REQUEST['paixu']) ? $_REQUEST['paixu'] : '';


    //1.写查询语句
    $index = ($page - 1) * $num;
    if($paixu){
        $sql = "SELECT * FROM taobao ORDER BY price $paixu LIMIT $index,$num";
    }else {
        $sql = "SELECT * FROM taobao LIMIT $index,$num";
    }

    //2.执行语句
    $res = $conn->query($sql);

    //3.提取数据
    $arr = $res->fetch_all(MYSQLI_ASSOC);

    //语句：查询整个表的
    $sql2 = 'SELECT * FROM taobao';
    $res2 = $conn->query($sql2);

    // 4.把数据转成字符串，echo给前端
    $data = array(
        'total' => $res2->num_rows,
        'list' => $arr,
        'page' => $page,
        'num' => $num,
    );
    echo json_encode($data);

    //5.关闭数据库
    $res->close();
    $conn->close();

?>