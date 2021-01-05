<template>
	<span class="tree-expand clear">
		<span class="tree-label fl" :class="[errFlag ? 'red' : '']" v-show="DATA.isEdit">
			<el-input class="edit red" size="mini" autofocus
			v-model="DATA[labelName]"
			:ref="'treeInput'+DATA.id"
			:placeholder="placeholder"
			@click.stop.native="nodeEditFocus"
			@keydown.stop.native="keydownFn"
			@keyup.enter.stop.native="nodeEditPass(STORE,DATA,NODE)"></el-input>
		</span>
		<span v-show="DATA.isEdit" class="fr">
			<el-button size="mini" type="primary" @click.stop.native="nodeEditPass(STORE,DATA,NODE)">确定</el-button>
			<el-button size="mini" type="danger"  @click.stop.native="cancelEdit(STORE,DATA,NODE)">取消</el-button>
		</span>
		<span v-show="!DATA.isEdit" 
		:class="[DATA && DATA.newNode ? 'tree-new tree-label' : 'tree-label']">
			<span>{{DATA[labelName]}}</span>
		</span>
		
		<span class="tree-btn" v-show="!DATA.isEdit">
			<i class="el-icon-edit" @click.stop="nodeEdit(STORE,DATA,NODE)"></i>
			<i class="el-icon-remove-outline" @click.stop="nodeDel(STORE,DATA,NODE)"></i>
			<i class="el-icon-circle-plus-outline" @click.stop="nodeAdd(STORE,DATA,NODE)"></i>
		</span>
	</span>
</template>

<script>
	export default{
		name: 'treeExpand',
		props: ['NODE', 'DATA', 'STORE', 'someOneIsEditing','labelName'],
		data(){
			return {
				placeholder: '请输入',
				errFlag:false,
				oldEditName: ''
			}
		},
		methods: {
			nodeAdd(s,d,n){//新增
				console.log(s,d,n);
				console.log(this.someOneIsEditing);
				var _this = this;
        		if(_this.someOneIsEditing){
        		  	_this.$alert('请先完成当前编辑项!', '提示', {
			          confirmButtonText: '确定',
			          type: 'warning',
			          callback: action => {
			            return;
			          }
			        });
        		  return;
        		}
				_this.$emit('nodeAdd',s,d,n)
			},
			nodeEdit(s,d,n){//编辑
				var _this = this;
        		if(_this.someOneIsEditing){
        		  	_this.$alert('请先完成当前编辑项!', '提示', {
			          confirmButtonText: '确定',
			          type: 'warning',
			          callback: action => {
			            return;
			          }
			        });
        		  return;
        		}
				console.log(s,d,n);
				console.log(this.labelName);
				this.oldEditName = d[this.labelName];
				d.isEdit = true;
				this.$nextTick(() => {
					this.$refs['treeInput'+d.id].$refs.input.focus()
				})
				this.$emit('nodeEdit',s,d,n)
			},
			nodeDel(s,d,n){//删除
				var _this = this;
        		if(_this.someOneIsEditing){
        		  	_this.$alert('请先完成当前编辑项!', '提示', {
			          confirmButtonText: '确定',
			          type: 'warning',
			          callback: action => {
			            return;
			          }
			        });
        		  return;
        		}
				console.log(this.someOneIsEditing);
				_this.$emit('nodeDel',s,d,n)
			},
			nodeEditPass(s,d,n){//编辑完成
				var _this = this;
				console.log(s,d,n);
				var newLabelName = d[this.labelName].replace(/(^\s*)|(\s*$)/g,"");
				_this.DATA[this.labelName] = newLabelName;
				console.log(newLabelName);
				if(newLabelName=='') {
					_this.placeholder = '内容不能为空';
					_this.errFlag= true;
					return;
				}
				if(d && d.newNode) {
					_this.$emit('newEditPass',s,d,n); //新增节点编辑完成
				}else{
					_this.$emit('oldEditPass',s,d,n);  //原来的节点编辑完成
				}

				//d.isEdit = false;
			},
			nodeEditFocus(){
				//阻止点击节点的事件冒泡
			},
			keydownFn(){
				var _this = this;
				_this.placeholder = '请输入';
				_this.errFlag= false;
			},
			cancelEdit(s,d,n){
				console.log(s,d,n);
				if(d && d.newNode) {
					this.$emit('nodeDel',s,d,n)  //取消新增节点
				}else{
					this.DATA[this.labelName] = this.oldEditName;
					d.isEdit = false;  //取消编辑当前节点
					this.$emit('cancelEdit',s,d,n) 
				}
			}
		}
	}
</script>

<style rel="stylesheet/less" lang="less">
	.tree-expand{
		overflow:hidden;
		height:26px;
	
		.tree-label.tree-new{
			font-weight:600;
		}
		.tree-label{
			font-size:1em;
		}
		.tree-label .edit{
			width:80%;
		}
		.tree-btn{
			display:none;
			float:right;
			margin-left:5px;
			font-size:10px;
		}
		.tree-btn i{
			color:#8492a6;
			font-size:1.3em;
			margin:5px 3px 0 0;

		}
		.tree-label .el-input__inner{height:25px!important;line-height:25px!important;}
		.tree-label.red .el-input__inner::-webkit-input-placeholder{color:red;}
		.tree-label.red .el-input__inner:-ms-input-placeholder{color:red;}
		.tree-label.red .el-input__inner::placeholder{color:red;}
		.tree-label.red .el-input__inner{border-color:red; }
		.el-button--mini{
			padding:2px;
			margin-top:4px;
			margin-left:2px;
		}
	}
</style>