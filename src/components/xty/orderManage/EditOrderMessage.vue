<template>
  <div class="editOrderMsg">
    <a-form :form="form">
      <a-row>
        <a-form-item label="合同号" :labelCol="{span:2}" :wrapperCol="{span:22}" required>
          <a-input v-decorator="['contractNo', { rules: [{ required:'true', message: '请填写合同号'}]}]"></a-input>
        </a-form-item>
      </a-row>
      <a-row>
        <a-form-item label="项目名称" :labelCol="{span:2}" :wrapperCol="{span:22}" required>
          <a-input
            v-decorator="['contractName', { rules: [{ required:'true', message: '请填写项目名称'}]}]"
          ></a-input>
        </a-form-item>
      </a-row>
      <a-row>
        <a-form-item label="订单类别" :labelCol="{span:2}" :wrapperCol="{span:22}" required>
          <a-input-group compact>
            <a-select
              style="width:100%"
              v-decorator="['orderType', { rules: [{ required:'true', message: '请选择'}]}]"
            >
              >
              <a-select-option value="1">贸易类</a-select-option>
              <a-select-option value="2">咨询类</a-select-option>
              <a-select-option value="3">设计制造类</a-select-option>
              <a-select-option value="4">其他</a-select-option>
            </a-select>
          </a-input-group>
        </a-form-item>
      </a-row>
      <a-row>
        <a-form-item label="订单编号" :labelCol="{span:2}" :wrapperCol="{span:22}" required>
          <a-input v-decorator="['no', { rules: [{ required:'true', message: '请填写订单编号'}]}]"></a-input>
        </a-form-item>
      </a-row>
      <a-row>
        <a-form-item label="承接部门" :labelCol="{span:2}" :wrapperCol="{span:22}" required>
          <a-input
            v-decorator="['undertakeDep', { rules: [{ required:'true', message: '请填写承接部门'}]}]"
          ></a-input>
        </a-form-item>
      </a-row>
      <a-row>
        <a-form-item label="业务员" :labelCol="{span:2}" :wrapperCol="{span:22}">
          <a-input v-decorator="['dutyBy']"></a-input>
        </a-form-item>
      </a-row>
      <a-row>
        <a-form-item label="客户名称" :labelCol="{span:2}" :wrapperCol="{span:22}" required>
          <a-input
            v-decorator="['customerName', { rules: [{ required:'true', message: '请填写客户名称'}]}]"
          ></a-input>
        </a-form-item>
      </a-row>
      <a-row>
        <a-form-item label="合同金额" :labelCol="{span:2}" :wrapperCol="{span:22}">
          <a-input v-decorator="['totalMoney']" addonAfter="元"></a-input>
        </a-form-item>
      </a-row>
      <a-row>
        <a-form-item label="计量单位" :labelCol="{span:2}" :wrapperCol="{span:22}" required>
          <a-input
            v-decorator="['measureUnit', { rules: [{ required:'true', message: '请填写计量单位'}]}]"
          ></a-input>
        </a-form-item>
      </a-row>
      <a-row>
        <a-form-item label="订单数量" :labelCol="{span:2}" :wrapperCol="{span:22}" required>
          <a-input
            v-decorator="['orderQuantity', { rules: [{ required:'true', message: '请填写订单数量'}]}]"
          ></a-input>
        </a-form-item>
      </a-row>
      <a-row>
        <a-form-item label="运输方式" :labelCol="{span:2}" :wrapperCol="{span:22}">
          <a-input v-decorator="['transportType']"></a-input>
        </a-form-item>
      </a-row>
      <a-row>
        <a-form-item label="签订时间" :labelCol="{span:2}" :wrapperCol="{span:22}">
          <a-input v-decorator="['gmtSign']"></a-input>
        </a-form-item>
      </a-row>
      <a-row>
        <a-form-item label="交货地点" :labelCol="{span:2}" :wrapperCol="{span:22}">
          <a-input v-decorator="['deliveryPlace']"></a-input>
        </a-form-item>
      </a-row>
      <a-row>
        <a-form-item label="交货日期" :labelCol="{span:2}" :wrapperCol="{span:22}" required>
          <a-date-picker @change="onChange" v-decorator="['gmtDelivery']" format="YYYY/MM/DD" />
        </a-form-item>
      </a-row>
      <a-row>
        <a-form-item label="附件" :labelCol="{span:2}" :wrapperCol="{span:22}">
          <a-upload
            name="file"
            :multiple="true"
            listType="picture"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          >
            <a-button>
              <a-icon type="upload" />选择文件
            </a-button>
          </a-upload>
        </a-form-item>
      </a-row>
      <a-row>
        <a-form-item label="备注" :labelCol="{span:2}" :wrapperCol="{span:22}">
          <a-textarea v-decorator="['remark']" :rows="4" :autosize="{ minRows: 4, maxRows: 4}"></a-textarea>
        </a-form-item>
      </a-row>
      <a-row>
        <a-form-item :wrapper-col="{ span: 20,offset: 2 }" style="text-align:right">
          <a-button @click="confirmCancel">关闭</a-button>
          <a-button type="primary" @click="handleSubmit()">提交</a-button>
        </a-form-item>
      </a-row>
    </a-form>
  </div>
</template>
<script>
export default {
  props: {
    OrderMessageId: {
      default: null
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      orderNo: "",
      dataValue: ""
    };
  },
  methods: {
    onChange(date, dateString) {
      console.log(date, dateString);
      this.dataValue = dateString;
    },
    confirmCancel() {
      this.$emit("changeAddOrder", false);
    },
    handleSubmit() {
      this.form.validateFieldsAndScroll((err, values) => {
        console.log(values);
        if (!err) {
          let qs = require("qs");
          let data = {
            contractName: values.contractName,
            contractNo: values.contractNo,
            customerName: values.customerName,
            measureUnit: values.measureUnit,
            gmtDelivery: this.dataValue,
            no: values.no,
            orderType: values.orderType,
            orderQuantity: values.orderQuantity,
            undertakeDep: values.undertakeDep
          };
          console.log(data);
          this.Axios(
            {
              url: `/api-order/order/updateOrder/${this.OrderMessageId}`,
              params: data,
              type: "post",
              option: { successMsg: "修改成功！" },
              config: {
                headers: { "Content-Type": "application/json" }
              }
            },
            this
          ).then(
            result => {
              if (result.data.code === 200) {
                console.log(result);
                this.$router.back(-1);
              }
            },
            ({ type, info }) => {}
          );
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.addOrderMsg {
  .ant-input {
    width: 90%;
  }
  .ant-input-group {
    width: 90%;
  }
  .ant-row.ant-form-item {
    margin-bottom: 15px;
  }
}
</style>