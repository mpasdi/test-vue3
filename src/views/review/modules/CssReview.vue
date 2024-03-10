<!--
 * @Author: lisongming
 * @Date: 2024-03-08 09:42:49
 * @LastEditors: lisongming
 * @Description: 描述
-->
<template>
  <div class="css-review">
    <h1>css 复习</h1>
    <h2>flex 布局</h2>
    <div class="css-flex">
      <div class="css-flex_item" v-for="item in 4" :key="item">{{ item }}</div>
    </div>

    <h2>gird 布局</h2>
    <div class="css-grid">
      <div class="css-grid_item" v-for="item in 7" :key="item">{{ item }}</div>
    </div>
    <div class="css-grid-area">
      <div class="css-grid-area_item" v-for="item in 4" :key="item">{{ item }}</div>
    </div>

    <h2>盒模型</h2>
    <div class="standard-box">1</div>
    <div class="wired-box">2</div>

    <h2>css 中的各种单位</h2>
    <div class="unit-px">px</div>
    <div class="unit-bai">%</div>
    <div class="unit-rem">rem</div>
    <div class="unit-em">em</div>
    <div class="unit-vhw">vh vw</div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
  @custom-color: #c3d08b;

  .css-review {
    font-size: 20px;
  }
  .css-flex {
    display: flex;
    background-color: orangered;
    justify-content: space-evenly; // 容器： 水平方向： center，end, start, flex-end, flex-start, right, left space-around, space-between, space-evenly ;
    font-size: 20px;
    height: 200px;
    // align-items: flex-start; // 容器： 垂直方向：center, start end flex-start flex-end stretch
    align-content: space-evenly; // flex-end flex-start center space-between space-around space-evenly
    flex-direction: row-reverse; // 容器：设置主轴 row row-reverse column column-reverse
    flex-wrap: wrap-reverse; //nowrap wrap wrap-reverse

    &_item {
      width: 30%;
      // height: 40px;
      border: 2px solid wheat;
      flex: 0 0 30%;
      // align-self: flex-start;
      order: 1;
    }
    &_item:nth-child(4) {
      order: 0;
    }
  }

  .css-grid {
    background-color: @custom-color;
    font-size: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr); // 容器：垂直三列
    // grid-template-columns: 1fr 2fr 1fr;
    // grid-template-rows: 2fr 1fr;
    row-gap: 20px;
    gap: 10px 10px; // 间隙， row column

    &_item {
      // width: 30px;
      border: 2px solid saddlebrown;
    }
    &_item:nth-child(1) {
      color: white;
      grid-column: span 2;
    }
    &_item:nth-child(4) {
      color: white;
      grid-row: span 2;
    }
  }

  .custom-color(@color) {
    background-color: @color;
  }
  .custom-item(@color) {
    width: 50px;
    height: 50px;
    border-radius: 3px;
    color: @color;
    border: 1px solid @color;
  }
  .css-grid-area {
    .custom-color(skyblue);
    font-size: 20px;
    display: grid;
    grid-template-areas: 'header header' 'header body' 'foot .';
    margin-top: 20px;
    grid-gap: 10px 10px;
    justify-items: center; // 容器项居中
    height: 200px;
    // justify-content: center; // 容器居中
    align-items: center;
    align-content: center;
    &_item {
      // width: 30px;
      .custom-item(saddlebrown);
    }

    &_item:nth-child(1) {
      grid-area: header;
    }
  }

  .custom-box(@color) {
    color: @color;
    width: 100px;
    height: 100px;
    border: 20px solid @color;
    padding: 10px;
    margin: 10px;
  }
  .standard-box {
    .custom-box(aqua);
    box-sizing: content-box;
  }
  .wired-box {
    .custom-box(orange);
    box-sizing: border-box;
  }

  .unit-px {
    width: 100px;
    height: 100px;
    border: 1px solid indianred;
  }
  .unit-bai {
    width: 100%;
    height: 100%;
    border: 1px solid indianred;
  }
  .unit-rem {
    width: 10rem;
    height: 10rem;
    border: 1px solid indianred;
  }
  .unit-em {
    width: 10em;
    height: 10em;
    border: 1px solid indianred;
  }

  .unit-vhw {
    width: 10vw;
    height: 10vh;
    border: 1px solid indianred;
  }
</style>
