<template>
	<div class="equipment_list">
		<router-view></router-view>
		<div :class="[{hide:isHideList}]">
			<a-row>
				<!-- <a-col :span="4">
					<div class="left_nav">
						<div>
							<a-list :dataSource="allClassify" size="small">
								<a-list-item slot="renderItem" slot-scope="item, index">{{item}}</a-list-item>
								<div slot="header" style="color:rgb(31, 31, 31)">所有分类</div>
							</a-list>
							<a-list :dataSource="allClassify" size="small">
								<a-list-item slot="renderItem" slot-scope="item, index">{{item}}</a-list-item>
								<div slot="header" style="color:rgb(31, 31, 31)">所有类别</div>
							</a-list>
							<a-list :dataSource="allClassify" size="small">
								<a-list-item slot="renderItem" slot-scope="item, index">{{item}}</a-list-item>
								<div slot="header" style="color:rgb(31, 31, 31)">设备状况</div>
							</a-list>
						</div>
					</div>
				</a-col>-->
				<a-col :span="24" style="padding:0 20px;">
					<a-row>
						<div style="line-height:50px;">
							<a-col :span="8">
								<!-- <a-button type="primary" @click="$router.push({path:'/MyDevice/AddEquipment'})">
									<a-icon type="plus-circle"/>新增
								</a-button>-->
								<a-button @click="$router.push({path:'/MyDevice/AddEquipment'})">
									<a-icon style="color:#1890ff;" type="plus"/>新增
								</a-button>
								<a-button @click="edit">
									<a-icon style="color:#1890ff;" type="edit"/>修改
								</a-button>
								<a-popconfirm title="确定删除吗?" @confirm="() => onDelete()">
									<a-button>
										<a-icon style="color:#1890ff;" type="delete"/>删除
									</a-button>
								</a-popconfirm>
							</a-col>
							<a-col :span="16" style="text-align:right">
								关键字：
								<a-input type="text" style="width:300px" placeholder="根据设备编号，名称，位号"></a-input>
								<a-button type="primary" icon="search">搜索</a-button>
								<a-button @click="visible=true">高级搜索</a-button>
							</a-col>
						</div>
					</a-row>
					<a-row style="padding-top:10px;">
						<a-table
							:columns="columns"
							:pagination="false"
							:dataSource="data"
							:rowSelection="rowSelection"
						></a-table>
						<a-pagination
							style="padding-top:12px;text-align: right;"
							showQuickJumper
							:defaultCurrent="current"
							:total="total"
							@change="onChange"
							showSizeChanger
							:pageSizeOptions="['10','20','30']"
							@showSizeChange="onShowSizeChange"
							:showTotal="total => `共 ${total} 条`"
						/>
					</a-row>
				</a-col>
			</a-row>
		</div>
		<a-drawer
			title="高级搜索"
			:width="300"
			@close="visible=false"
			:visible="visible"
			:wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
		>
			<a-form :form="form">
				<a-form-item :label-col=" { span: 8 }" :wrapper-col="{ span: 16 }" label="设备名称">
					<a-input></a-input>
				</a-form-item>
				<a-form-item :label-col=" { span: 8 }" :wrapper-col="{ span: 16 }" label="设备位号">
					<a-input></a-input>
				</a-form-item>
				<a-form-item :label-col=" { span: 8 }" :wrapper-col="{ span: 16 }" label="负责人">
					<a-input></a-input>
				</a-form-item>
				<a-form-item :label-col=" { span: 8 }" :wrapper-col="{ span: 16 }" label="设备厂家">
					<a-input></a-input>
				</a-form-item>
				<a-form-item :label-col=" { span: 8 }" :wrapper-col="{ span: 16 }" label="设备状况">
					<a-checkbox-group @change="onChange" style="line-height:38px">
						<a-row>
							<a-col :span="12">
								<a-checkbox value="1">在用</a-checkbox>
							</a-col>
							<a-col :span="12">
								<a-checkbox value="2">出租</a-checkbox>
							</a-col>
							<a-col :span="12">
								<a-checkbox value="3">停用</a-checkbox>
							</a-col>
							<a-col :span="12">
								<a-checkbox value="4">封存</a-checkbox>
							</a-col>
							<a-col :span="12">
								<a-checkbox value="5">报废</a-checkbox>
							</a-col>
						</a-row>
					</a-checkbox-group>
				</a-form-item>
			</a-form>

			<div
				:style="{
					position: 'absolute',
					left: 0,
					bottom: 0,
					width: '100%',
					borderTop: '1px solid #e9e9e9',
					padding: '10px 16px',
					background: '#fff',
					textAlign: 'right',
				}"
			>
				<a-button :style="{marginRight: '8px'}" @click="visible=false">取消</a-button>
				<a-button @click="visible=false" type="primary">搜索</a-button>
			</div>
		</a-drawer>
	</div>
</template>
<script>
const rowSelection = {
	onChange: (selectedRowKeys, selectedRows) => {
		console.log(
			`selectedRowKeys: ${selectedRowKeys}`,
			"selectedRows: ",
			selectedRows
		);
	},
	onSelect: (record, selected, selectedRows) => {
		console.log(record, selected, selectedRows);
	},
	onSelectAll: (selected, selectedRows, changeRows) => {
		console.log(selected, selectedRows, changeRows);
	}
};
const columns = [
	{
		dataIndex: "deviceNo",
		title: "设备编号",
		width: 100,
		key: "deviceNo"
	},
	{
		dataIndex: "deviceName",
		title: "名称",
		width: 120,
		key: "deviceName"
	},
	{
		dataIndex: "deviceState",
		key: "deviceState",
		title: "规格型号",
		width: 70,
		scopedSlots: { customRender: "deviceState" }
	},
	{
		dataIndex: "organizeName",
		key: "organizeName",
		title: "分类",
		width: 160
	},
	{
		dataIndex: "location",
		key: "location",
		title: "类别",
		width: 80
	},
	{
		dataIndex: "locationNo",
		key: "locationNo",
		title: "所处班组",
		width: 80
	},
	{
		dataIndex: "deviceCategoryName",
		key: "deviceCategoryName",
		title: "状态",
		width: 70
	}
];
const data = [
	{
		key: "0",
		deviceNo: "111",
		deviceName: "11",
		deviceState: "11",
		organizeName: "11",
		location: "11",
		locationNo: "11",
		deviceCategoryName: "11",
		deviceModel: "11",
		workerNames: "11"
	},
	{
		key: "1",
		deviceNo: "111",
		deviceName: "11",
		deviceState: "11",
		organizeName: "11",
		location: "11",
		locationNo: "11",
		deviceCategoryName: "11",
		deviceModel: "11",
		workerNames: "11"
	},
	{
		key: "2",
		deviceNo: "111",
		deviceName: "11",
		deviceState: "11",
		organizeName: "11",
		location: "11",
		locationNo: "11",
		deviceCategoryName: "11",
		deviceModel: "11",
		workerNames: "11"
	}
];

export default {
	data() {
		return {
			rowSelection,
			form: this.$form.createForm(this),
			visible: false,
			isHideList: this.$route.params.id !== undefined ? true : false,
			allClassify: [
				"生产设备",
				"非生产设备",
				"辅助生产设备",
				"检验检测设备",
				"其他设备"
			],
			columns,
			data,
			current: 1,
			pageSize: 10,
			total: 50
		};
	},
	methods: {
		onDelete(e) {
			console.log(e);
			this.$message.success("Click on Yes");
		},
		cancel(e) {
			console.log(e);
			this.$message.error("Click on No");
		},
		onShowSizeChange(current, pageSize) {
			this.pageSize = pageSize;
		},
		onChange(current, pageNumber) {
			console.log("Page: ", pageNumber);
			console.log("第几页: ", current);
			this.current = current;
		},
		edit(record, text, index) {
			this.$router.push({ path: "/MyDevice/EditEquipment/" + record.key });
		}
	},
	created() {
		let a = this.$route.matched.find(item => item.name === "AddEquipment")
			? true
			: false;
		let b = this.$route.params.id !== undefined ? true : false;
		this.isHideList = a || b ? true : false;
	},
	watch: {
		$route() {
			let a = this.$route.matched.find(item => item.name === "AddEquipment")
				? true
				: false;
			let b = this.$route.params.id !== undefined ? true : false;
			this.isHideList = a || b ? true : false;
		}
	}
};
</script>
<style lang="less">
.equipment_list {
	.left_nav {
		border: 1px solid #dde2eb;
		padding: 0 8px;
	}
	.ant-list-item {
		cursor: pointer;
		padding-left: 20px;
		&:hover {
			background-color: #f5f7fa;
		}
	}
}
</style>
