<template>
  <div>
    <div class="floor-area">
      <div class="floor-title">{{floorName}}</div>
      <div class="floor-body">
        <div class="floor-anormaly">
          <div class="floor-left">
            <img :src="floorData0.image" class="img-fluid" />
          </div>
          <div class="floor-right">
            <div>
              <img :src="floorData1.image" class="img-fluid" />
            </div>
            <div>
              <img :src="floorData2.image" class="img-fluid" />
            </div>
          </div>
        </div>
        <div class="floor-normally">
          <div v-for="(item, index) in floorData.slice(3)" :key="index">
            <img :src="item.image" class="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["floorData", "floorName"],
  data() {
    return {
      floorData0: {},
      floorData1: {},
      floorData2: {}
    };
  },
  watch: {
    floorData() {
      this.floorData0 = this.floorData[0];
      this.floorData1 = this.floorData[1];
      this.floorData2 = this.floorData[2];
    }
  }
};
</script>

<style lang="scss" scoped>
.floor-title {
  padding-top: px2rem(30px);
  font-size: 16px;
  font-weight: bold;
}

.floor-anormaly {
  display: flex;
  padding: px2rem(15px);
  border-bottom: 1px solid #ddd;
}

.floor-left {
  border-right: 1px solid #ddd;
}

.floor-right div:first-child{
    border-bottom: 1px solid #ddd;
}

.floor-normally {
  display: flex;
  padding: px2rem(15px);
  border-bottom: 1px solid #ddd;

  div:nth-child(odd) {
    border-right: 1px solid #ddd;
  }
}
</style>
