<?php
/**
 * 系统设置
**/
$mod='blank';
include("../includes/common.php");
$title='MCPORTAL网页系统设置';
include './head.php';
if($islogin==1){}else exit("<script language='javascript'>window.location.href='./login.php';</script>");
?>
  <nav class="navbar navbar-fixed-top navbar-default">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">导航按钮</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="./">站点设置</a>
      </div><!-- /.navbar-header -->
      <div id="navbar" class="collapse navbar-collapse">
        <ul class="nav navbar-nav navbar-right">
          <li>
            <a href="./">仪表盘</a>
         
		  <li class="active"><a href="./set.php"> 站点设置</a></li>
		  <li><a href="../">返回首页</a></li>
          <li><a href="./login.php?logout">退出登陆</a></li>
        </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container -->
  </nav><!-- /.navbar -->
  <div class="container" style="padding-top:70px;">
    <div class="col-xs-12 col-sm-10 col-lg-8 center-block" style="float: none;">
<?php
if(isset($_POST['submit'])) {
	$sitename=daddslashes($_POST['sitename']);
	$keywords=daddslashes($_POST['keywords']);
	$description=daddslashes($_POST['description']);
	$icp=daddslashes($_POST['icp']);
	$ga=daddslashes($_POST['ga']);
	$dh1=daddslashes($_POST['dh1']);
	$dh1dz=daddslashes($_POST['dh1dz']);
	$dh2=daddslashes($_POST['dh2']);
	$dh2dz=daddslashes($_POST['dh2dz']);
	$dh3=daddslashes($_POST['dh3']);
	$dh3dz=daddslashes($_POST['dh3dz']);
	$dh4=daddslashes($_POST['dh4']);
	$dh4dz=daddslashes($_POST['dh4dz']);
	$dh5=daddslashes($_POST['dh5']);
	$dh5dz=daddslashes($_POST['dh5dz']);
	$server=daddslashes($_POST['server']);
	$jianjie=daddslashes($_POST['jianjie']);
	$khd=daddslashes($_POST['khd']);
	$spanjianjie=daddslashes($_POST['spanjianjie']);
	$jq=daddslashes($_POST['jq']);
	$xcp=daddslashes($_POST['xcp']);
	$xcptu=daddslashes($_POST['xcptu']);
	$tesetu1=daddslashes($_POST['tesetu1']);
	$tesetu2=daddslashes($_POST['tesetu2']);
	$tesetu3=daddslashes($_POST['tesetu3']);
	$tese1=daddslashes($_POST['tese1']);
	$tese2=daddslashes($_POST['tese2']);
	$tese3=daddslashes($_POST['tese3']);
	$tesejianjie1=daddslashes($_POST['tesejianjie1']);
	$tesejianjie2=daddslashes($_POST['tesejianjie2']);
	$tesejianjie3=daddslashes($_POST['tesejianjie3']);
	$tuanduitu1=daddslashes($_POST['tuanduitu1']);
	$tuanduitu2=daddslashes($_POST['tuanduitu2']);
	$tuanduitu3=daddslashes($_POST['tuanduitu3']);
	$tuandui1=daddslashes($_POST['tuandui1']);
	$tuandui2=daddslashes($_POST['tuandui2']);
	$tuandui3=daddslashes($_POST['tuandui3']);
	$tuanduijianjie1=daddslashes($_POST['tuanduijianjie1']);
	$tuanduijianjie2=daddslashes($_POST['tuanduijianjie2']);
	$tuanduijianjie3=daddslashes($_POST['tuanduijianjie3']);
	$tp1=daddslashes($_POST['tp1']);
	$tp2=daddslashes($_POST['tp2']);
	$tp3=daddslashes($_POST['tp3']);
	$tp4=daddslashes($_POST['tp4']);
	$tp5=daddslashes($_POST['tp5']);
	$tp6=daddslashes($_POST['tp6']);
	$music=daddslashes($_POST['music']);
	$pwd=daddslashes($_POST['pwd']);
	$sql="update `mcp_config` set `sitename` ='{$sitename}',`keywords` ='{$keywords}',`description` ='{$description}',`icp` ='{$icp}',`ga` ='{$ga}',`dh1` ='{$dh1}',`dh1dz` ='{$dh1dz}',`dh2` ='{$dh2}',`dh2dz` ='{$dh2dz}',`dh3` ='{$dh3}',`dh3dz` ='{$dh3dz}',`dh4` ='{$dh4}',`dh4dz` ='{$dh4dz}',`dh5` ='{$dh5}',`dh5dz` ='{$dh5dz}',`server` ='{$server}',`spanjianjie` ='{$spanjianjie}',`khd` ='{$khd}',`jianjie` ='{$jianjie}',`jq` ='{$jq}',`xcp` ='{$xcp}',`xcptu` ='{$xcptu}',`tesetu1` ='{$tesetu1}',`tesetu2` ='{$tesetu2}',`tesetu3` ='{$tesetu3}',`tese1` ='{$tese1}',`tese2` ='{$tese2}',`tese3` ='{$tese3}',`tesejianjie1` ='{$tesejianjie1}',`tesejianjie2` ='{$tesejianjie2}',`tesejianjie3` ='{$tesejianjie3}',`tuanduitu1` ='{$tuanduitu1}',`tuanduitu2` ='{$tuanduitu2}',`tuanduitu3` ='{$tuanduitu3}',`tuandui1` ='{$tuandui1}',`tuandui2` ='{$tuandui2}',`tuandui3` ='{$tuandui3}',`tuanduijianjie1` ='{$tuanduijianjie1}',`tuanduijianjie2` ='{$tuanduijianjie2}',`tuanduijianjie3` ='{$tuanduijianjie3}',`tp1` ='{$tp1}',`tp2` ='{$tp2}',`tp3` ='{$tp3}',`tp4` ='{$tp4}',`tp5` ='{$tp5}',`tp6` ='{$tp6}',`music` ='{$music}'";
	if(!empty($pwd))$DB->query("update `mcp_config` set `pwd` ='{$pwd}' where `id`='{$siteid}'");
	if(!empty($keywords))$DB->query("update `mcp_config` set `keywords` ='{$keywords}' where `id`='{$siteid}'");
	if($DB->query($sql))showmsg('修改成功！',1);
	else showmsg('修改失败！<br/>'.$DB->error(),4);
}else{
?>
<div class="panel panel-primary">
<div class="panel-heading"><h3 class="panel-title">站点设置</h3></div>
<div class="panel-body">
  <form action="./set.php" method="post" class="form-horizontal" role="form">
	<div class="form-group">
	  <label class="col-sm-2 control-label">网站名称</label>
	  <div class="col-sm-10"><input type="text" name="sitename" value="<?php echo $conf['sitename']; ?>" class="form-control"  placeholder="" required/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">关键字</label>
	  <div class="col-sm-10"><input type="text" name="keywords" value="<?php echo $conf['keywords']; ?>" class="form-control"  placeholder="" required/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">网站描述</label>
	  <div class="col-sm-10"><input type="text" name="description" value="<?php echo $conf['description']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">ICP备案号</br>(没有留空)</label>
	  <div class="col-sm-10"><input type="text" name="icp" value="<?php echo $conf['icp']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">公安备案号</br>(没有留空)</label>
	  <div class="col-sm-10"><input type="text" name="ga" value="<?php echo $conf['ga']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">服务器LOGO</label>
	  <div class="col-sm-10"><p>请将图片以logo.png命名放置在static/images文件夹</p></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">网站标签logo</label>
	  <div class="col-sm-10"><p>请将图片以favicon.ico命名放置在网站根目录</p></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">网站banner图片</label>
	  <div class="col-sm-10"><p>非必要，请将图片以banner.jpg命名放置在static/images文件夹</p></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">导航栏1</label>
	  <div class="col-sm-10"><input type="text" name="dh1" value="<?php echo $conf['dh1']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">导航栏1链接</br>(不跳转请设置为井号#)</label>
	  <div class="col-sm-10"><input type="text" name="dh1dz" value="<?php echo $conf['dh1dz']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">导航栏2</br>(留空不显示)</label>
	  <div class="col-sm-10"><input type="text" name="dh2" value="<?php echo $conf['dh2']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">导航栏2链接</br>(不跳转请设置为井号#)</label>
	  <div class="col-sm-10"><input type="text" name="dh2dz" value="<?php echo $conf['dh2dz']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">导航栏3</br>(留空不显示)</label>
	  <div class="col-sm-10"><input type="text" name="dh3" value="<?php echo $conf['dh3']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">导航栏3链接</br>(不跳转请设置为井号#)</label>
	  <div class="col-sm-10"><input type="text" name="dh3dz" value="<?php echo $conf['dh3dz']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">导航栏4</br>(留空不显示)</label>
	  <div class="col-sm-10"><input type="text" name="dh4" value="<?php echo $conf['dh4']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">导航栏4链接</br>(不跳转请设置为井号#)</label>
	  <div class="col-sm-10"><input type="text" name="dh4dz" value="<?php echo $conf['dh4dz']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">导航栏5</br>(留空不显示)</label>
	  <div class="col-sm-10"><input type="text" name="dh5" value="<?php echo $conf['dh5']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">导航栏5链接</br>(不跳转请设置为井号#)</label>
	  <div class="col-sm-10"><input type="text" name="dh5dz" value="<?php echo $conf['dh5dz']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">服务器名称</label>
	  <div class="col-sm-10"><input type="text" name="server" value="<?php echo $conf['server']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">客户端下载链接</label>
	  <div class="col-sm-10"><input type="text" name="khd" value="<?php echo $conf['khd']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">服务器简介</label>
	  <div class="col-sm-10"><input type="text" name="jianjie" value="<?php echo $conf['jianjie']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">交流群外链</br>(网址)</label>
	  <div class="col-sm-10"><input type="text" name="jq" value="<?php echo $conf['jq']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">宣传片简介</label>
	  <div class="col-sm-10"><input type="text" name="spanjianjie" value="<?php echo $conf['spanjianjie']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">宣传片外链</label>
	  <div class="col-sm-10"><input type="text" name="xcp" value="<?php echo $conf['xcp']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">宣传片预览图</label>
	  <div class="col-sm-10"><input type="text" name="xcptu" value="<?php echo $conf['xcptu']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">服务器特色①</label>
	  <div class="col-sm-10"><input type="text" name="tese1" value="<?php echo $conf['tese1']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">服务器特色②</label>
	  <div class="col-sm-10"><input type="text" name="tese2" value="<?php echo $conf['tese2']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">服务器特色③</label>
	  <div class="col-sm-10"><input type="text" name="tese3" value="<?php echo $conf['tese3']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">服务器特色图①</label>
	  <div class="col-sm-10"><input type="text" name="tesetu1" value="<?php echo $conf['tesetu1']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">服务器特色图②</label>
	  <div class="col-sm-10"><input type="text" name="tesetu2" value="<?php echo $conf['tesetu2']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">服务器特色图③</label>
	  <div class="col-sm-10"><input type="text" name="tesetu3" value="<?php echo $conf['tesetu3']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">服务器特色简介①</label>
	  <div class="col-sm-10"><input type="text" name="tesejianjie1" value="<?php echo $conf['tesejianjie1']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">服务器特色简介②</label>
	  <div class="col-sm-10"><input type="text" name="tesejianjie2" value="<?php echo $conf['tesejianjie2']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">服务器特色简介③</label>
	  <div class="col-sm-10"><input type="text" name="tesejianjie3" value="<?php echo $conf['tesejianjie3']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">团队成员①</label>
	  <div class="col-sm-10"><input type="text" name="tuandui1" value="<?php echo $conf['tuandui1']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">团队成员②</label>
	  <div class="col-sm-10"><input type="text" name="tuandui2" value="<?php echo $conf['tuandui2']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">团队成员③</label>
	  <div class="col-sm-10"><input type="text" name="tuandui3" value="<?php echo $conf['tuandui3']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">团队成员图片展示①</label>
	  <div class="col-sm-10"><input type="text" name="tuanduitu1" value="<?php echo $conf['tuanduitu1']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">团队成员图片展示②</label>
	  <div class="col-sm-10"><input type="text" name="tuanduitu2" value="<?php echo $conf['tuanduitu2']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">团队成员图片展示③</label>
	  <div class="col-sm-10"><input type="text" name="tuanduitu3" value="<?php echo $conf['tuanduitu3']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">团队成员简介①</label>
	  <div class="col-sm-10"><input type="text" name="tuanduijianjie1" value="<?php echo $conf['tuanduijianjie1']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">团队成员简介②</label>
	  <div class="col-sm-10"><input type="text" name="tuanduijianjie2" value="<?php echo $conf['tuanduijianjie2']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">团队成员简介③</label>
	  <div class="col-sm-10"><input type="text" name="tuanduijianjie3" value="<?php echo $conf['tuanduijianjie3']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">优质图片①</label>
	  <div class="col-sm-10"><input type="text" name="tp1" value="<?php echo $conf['tp1']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">优质图片②</label>
	  <div class="col-sm-10"><input type="text" name="tp2" value="<?php echo $conf['tp2']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">优质图片③</label>
	  <div class="col-sm-10"><input type="text" name="tp3" value="<?php echo $conf['tp3']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">优质图片④</label>
	  <div class="col-sm-10"><input type="text" name="tp4" value="<?php echo $conf['tp4']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">优质图片⑤</label>
	  <div class="col-sm-10"><input type="text" name="tp5" value="<?php echo $conf['tp5']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">优质图片⑥</label>
	  <div class="col-sm-10"><input type="text" name="tp6" value="<?php echo $conf['tp6']; ?>" class="form-control" placeholder=""/></div>
	</div><br/>
	
	<div class="form-group">
</div><br/>
	<div class="form-group">
	  <label class="col-sm-2 control-label">背景音乐外链</label>
	  <div class="col-sm-10"><input type="text" name="music" value="<?php echo $conf['music']; ?>" class="form-control" placeholder=".mp3结尾的外链"/></div>
	</div><br/>
  <form action="./set.php" method="post" class="form-horizontal" role="form">
	<div class="form-group">
	  <label class="col-sm-2 control-label">后台密码设置</label>
	  <div class="col-sm-10"><input type="text" name="pwd" value="" class="form-control" placeholder="不修改请留空"/></div>
	  <br/>
	</div><br/>
	<div class="form-group">
	  <div class="col-sm-offset-2 col-sm-10"><input type="submit" name="submit" value="修改" class="btn btn-primary form-control"/><br/>
	 </div>
	</div>
  </form>
</div>
</div>
<script>
var items = $("select[default]");
for (i = 0; i < items.length; i++) {
	$(items[i]).val($(items[i]).attr("default"));
}
</script>
<?php
}?>

    </div>
  </div>
