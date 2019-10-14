<?php
    include 'conn.php';

    $page = isset($_REQUEST['ipage']) ? $_REQUEST['ipage'] : '';
    $min = isset($_REQUEST['min']) ? $_REQUEST['min'] : '';
    $max = isset($_REQUEST['max']) ? $_REQUEST['max'] : '';
    $num = isset($_REQUEST['num']) ? $_REQUEST['num']: '';
    $paixu = isset($_REQUEST['paixu']) ? $_REQUEST['paixu']: '';

    //1.写查询语句
    $index = ($page - 1) * $num;
    if($min && $max){
        if($paixu) {
            $sql = "SELECT * FROM taobao WHERE price BETWEEN $min AND $max ORDER BY price $paixu LIMIT $index,$num";
        } else{
        $sql = "SELECT * FROM taobao WHERE price BETWEEN $min AND $max LIMIT $index,$num";
        }
    }

    //2.执行语句
    $res = $conn->query($sql);
    
    $sql2 = "SELECT * FROM taobao WHERE price BETWEEN $min AND $max";
    $res2 = $conn->query($sql2);
    //3.提取数据
    $arr = $res->fetch_all(MYSQLI_ASSOC);


    $data = array(
        'total' => $res2->num_rows,
        'list' => $arr,
        'page' => $page,
        'num' => $num,
    );
    echo json_encode($data,JSON_UNESCAPED_UNICODE);

    //5.关闭数据库
     $res->close();
     $conn->close();

?>
