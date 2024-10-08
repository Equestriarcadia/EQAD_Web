<?php
$mod='blank';
include("../includes/common.php");
$title='MCPORTAL网页系统后台管理';
include './head.php';
if($islogin==1){}else exit("<script language='javascript'>window.location.href='./login.php';</script>");
?>
<nav class="navbar navbar-fixed-top navbar-default">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">导航按钮</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="./">管理面板</a>
        </div><!-- /.navbar-header -->
        <div id="navbar" class="collapse navbar-collapse">
            <ul class="nav navbar-nav navbar-right">
                <li class="active">
                    <a href="./">仪表盘</a>
                </li>
                <li>

                </li>
                <li><a href="./set.php">站点设置</a></li>
                <li><a href="../">返回首页</a></li>
                <li><a href="./login.php?logout">退出登陆</a></li>
            </ul>
        </div><!-- /.navbar-collapse -->
    </div><!-- /.container -->
</nav><!-- /.navbar -->
<?php
$count=$DB->count("SELECT count(*) from mcportal_log WHERE siteid='$siteid'");
$mysqlversion=$DB->count("select VERSION()");
$fz=$DB->count("SELECT domain(*) from mcportal_domain WHERE domain='$domain'");
 
		$sql=" `km`='{$_GET['kw']}'";
	$numrows=$DB->count("SELECT count(*) from mcportal_domain WHERE 1");
?>
<div class="container" style="padding-top:70px;">
    <div class="col-xs-12 col-sm-10 col-lg-8 center-block" style="float: none;">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h3 class="panel-title">网站信息</h3>
            </div>
            <li class="list-group-item"><b>现在时间：</b>
                <?=$date?>
            </li>
            </ul>
            <li class="list-group-item"><b>程序版本：</b> 1.0.0</li>
            <li class="list-group-item"><b>授权状态：</b> 专业版（公益专业版）</li>
            </ul>
        </div>
        <div class="panel panel-info">
            <div class="panel-heading">
                <h3 class="panel-title">仪表盘</h3>
            </div>
            <ul class="list-group">
                <li class="list-group-item">
                    <b>PHP 版本：</b>
                    <?php echo phpversion() ?>
                    <?php if(ini_get('safe_mode')) { echo '线程安全'; } else { echo '非线程安全'; } ?>
                </li>
                <li class="list-group-item">
                    <b>MySQL 版本：</b>
                    <?php echo $mysqlversion ?>
                </li>
                <li class="list-group-item">
                    <b>服务器软件：</b>
                    <?php echo $_SERVER['SERVER_SOFTWARE'] ?>
                </li>

                <li class="list-group-item">
                    <b>程序最大运行时间：</b>
                    <?php echo ini_get('max_execution_time') ?>s
                </li>
                <li class="list-group-item">
                    <b>POST许可：</b>
                    <?php echo ini_get('post_max_size'); ?>
                </li>
                <li class="list-group-item">
                    <b>文件上传许可：</b>
                    <?php echo ini_get('upload_max_filesize'); ?>
                </li>
            </ul>
        </div>
    </div>
</div>