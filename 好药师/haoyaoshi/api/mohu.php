<?php 
    include 'conn.php';
    $page = isset($_REQUEST['ipage']) ? $_REQUEST['ipage'] : '5';
    $num = isset($_REQUEST['num']) ? $_REQUEST['num']: '5';
    $cont = isset($_REQUEST['cont']) ? $_REQUEST['cont']: '';
    $paixu = isset($_REQUEST['paixu']) ? $_REQUEST['paixu']: '';

    //1.写查询语句
    $index = ($page - 1) * $num;
    if($cont) { 
        if($paixu) {
            $sql = "SELECT * FROM haoyao WHERE name LIKE '%$cont' ORDER BY price $paixu LIMIT $index,$num";
        } else {
            $sql = "SELECT * FROM haoyao WHERE name LIKE '%$cont' LIMIT $index,$num";
        }
    }

    //2.执行语句
    $res = $conn->query($sql);

    //3.提取数据
    $arr = $res->fetch_all(MYSQLI_ASSOC);


    $sql2 = "SELECT * FROM haoyao WHERE name LIKE '%$cont'";
    $res2 = $conn->query($sql2);
    

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
