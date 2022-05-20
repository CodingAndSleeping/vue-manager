<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImage" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2022-05-01</span></p>
          <p>上次登录地点：<span>广州</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData">
          <el-table-column
            :key="key"
            v-for="(item, key) in tableLabel"
            :prop="key"
            :label="item"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px">
      <div class="num">
        <el-card
          :key="item.name"
          v-for="item in countData"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <div style="height: 280px" ref="orderChart"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 265px">
          <div style="height: 265px" ref="userChart"></div>
        </el-card>
        <el-card style="height: 265px">
          <div style="height: 240px" ref="videoChart"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import userImage from "@/assets/images/user.png";
import { getData } from "@/api/data";
import * as echarts from "echarts";
export default {
  name: "Home",
  data() {
    return {
      userImage,
      tableData: [],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  mounted() {
    getData().then((res) => {
      const { code, data } = res.data;
      if (code === 20000) {
        this.tableData = data.tableData;
        const order = data.orderData;
        const keyArr = Object.keys(order.data[0]);
        const series = [];
        keyArr.forEach((key) => {
          series.push({
            name: key,
            type: "line",
            data: order.data.map((item) => item[key]),
          });
        });

        // 基于准备好的dom，初始化echarts实例
        const orderChart = echarts.init(this.$refs.orderChart);
        orderChart.setOption({
          xAxis: {
            data: order.date,
          },
          yAxis: {},
          series,
          legend: {
            data: keyArr,
          },
        });

        const user = data.userData;
        const userChart = echarts.init(this.$refs.userChart);
        userChart.setOption({
          legend: {
            // 图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            left: "20%",
          },
          // 提示框
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category", // 类目轴
            data: user.map((item) => item.date),
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [
            {
              name: "新增用户",
              type: "bar",
              data: user.map((item) => item.new),
            },
            {
              name: "活跃用户",
              type: "bar",
              data: user.map((item) => item.active),
            },
          ],
        });

        const video = data.videoData;
        const videoChart = echarts.init(this.$refs.videoChart);
        videoChart.setOption({
          tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [
            {
              type: "pie",
              data: video,
            },
          ],
        });
      }
    });
  },
};
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>