<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a>&gt;
                <a href="/goods.html">购物商城</a>&gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <ProductZoomer v-if="images.normal_size.length!=0"
                                    :base-images="images"
                                    :base-zoomer-options="zoomerOptions"
                                />
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">
                                                {{
                                                goodsinfo.sell_price}}
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <!-- 绑定了数据  @change 改变 :min 最小值 :max 最大值  -->
                                                <el-input-number
                                                    v-model="buyCount"
                                                    :min="1"
                                                    :max="goodsinfo.stock_quantity"
                                                ></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em
                                                    id="commodityStockNum"
                                                >{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button
                                                    onclick="cartAdd(this,'/',1,'/shopping.html');"
                                                    class="buy"
                                                >立即购买</button>
                                                <button
                                                    @click="add2Cart"
                                                    class="add"
                                                >加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div
                                    id="tabHead"
                                    class="tab-head"
                                    style="position: static; top: 517px; width: 925px;"
                                >
                                    <ul>
                                        <li>
                                            <a
                                                href="javascript:;"
                                                @click="tabIndex=0"
                                                :class="{selected:tabIndex==0}"
                                            >商品介绍</a>
                                        </li>
                                        <li>
                                            <a
                                                href="javascript:;"
                                                @click="tabIndex=1"
                                                :class="{selected:tabIndex==1}"
                                            >商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <!-- 渲染html结构 -->
                            <div
                                class="tab-content entry"
                                v-html="goodsinfo.content"
                                v-show="tabIndex==0"
                            ></div>
                            <div class="tab-content" v-show="tabIndex==1">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea
                                                    v-model.trim="comment"
                                                    id="txtContent"
                                                    name="txtContent"
                                                    sucmsg=" "
                                                    data-type="*10-1000"
                                                    nullmsg="请填写评论内容！"
                                                ></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input
                                                    @click="submitComment"
                                                    id="btnSubmit"
                                                    name="submit"
                                                    type="submit"
                                                    value="提交评论"
                                                    class="submit"
                                                >
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p
                                            v-show="totalcount==0"
                                            style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);"
                                        >暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item,index) in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | shortTimePlus}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <!-- 使用iview的分页组件 -->
                                        <Page
                                            :current="pageIndex"
                                            @on-page-size-change="sizeChange"
                                            :total="totalcount"
                                            show-sizer
                                            placement="top"
                                            :page-size-opts="[6,8,12]"
                                            :page-size="pageSize"
                                            show-elevator
                                            @on-change="pageChange"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item,index) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/detail/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                            <!-- </a> -->
                                        </div>
                                        <div class="txt-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/detail/'+item.id">{{item.title}}</router-link>
                                            <!-- </a> -->
                                            <span>{{item.add_time | shortTime}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 返回顶部 -->
        <BackTop>
            <span>🚀</span>
        </BackTop>
    </div>
</template>
<script>
// import axios from "axios";
// import moment from 'moment'
export default {
  name: "detail",
  data: function() {
    return {
      //商品id
      artID: "",
      //服务器返回的商品数据
      //商品详情
      goodsinfo: {},
      //热卖商品
      hotgoodslist: [],
      //图片列表
      imglist: [],
      //购买数量
      buyCount: 1,
      //记录点击的tab索引
      tabIndex: 0,
      //页码
      pageIndex: 1,
      //页容量
      pageSize: 6,
      //评论内容
      comments: [],
      //总评论数
      totalcount: 0,
      //评论的内容
      comment: "",
      //放大镜数据
      images: {
          normal_size:[

          ]
      },
      //放大镜的设置
      zoomerOptions: {
        zoomFactor: 4,
        pane: "container-round",
        hoverDelay: 300,
        namespace: "inline-zoomer",
        move_by_click: true,
        scroll_items: 5,
        choosed_thumb_border_color: "#bbdefb"
      }
    };
  },
  //事件
  methods: {
    //初始化数据
    initData() {
      //初始化购买个数
      this.buyCount = 1;
      //保存数据
      this.artID = this.$route.params.artID;
      //调用接口 获取 详情数据  axios
      this.$axios
        .get(
          `http://111.230.232.110:8899/site/goods/getgoodsinfo/${this.artID}`
        )
        .then(result => {
          //商品详情
          this.goodsinfo = result.data.message.goodsinfo;
          //热卖商品
          this.hotgoodslist = result.data.message.hotgoodslist;
          //图片列表
          this.imglist = result.data.message.imglist;
          //设置 放大镜的数据即可
          this.images.normal_size=[];
          //循环添加数据
          this.imglist.forEach(v => {
              this.images.normal_size.push({
                  id:v.id,
                  url:v.original_path
                  
              })
            //   console.log(this.images.normal_size);
          });
        });
      this.getComment();
    },
    getComment() {
      this.$axios
        .get(
          `http://111.230.232.110:8899/site/comment/getbypage/goods/${
            this.artID
          }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
        )
        .then(result => {
          //评论信息
          this.comments = result.data.message;
          //总个数
          this.totalcount = result.data.totalcount;
        });
    },
    //页码改变
    pageChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.getComment();
    },
    //页容量改变
    sizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getComment();
    },
    //发表评论
    submitComment() {
      //非空判断
      if (this.comment == "") {
        //如果为空
        this.$Message.warning("请输入评论内容再发布");
      } else {
        //有内容
        this.$axios
          .post(`site/validate/comment/post/goods/${this.artID}`, {
            commenttxt: this.comment
          })
          .then(result => {
            //判断是否成功
            if (result.data.status == 0) {
              this.$Message.success(result.data.message);
              //清空评论
              this.comment == "";
              //初始化首页为1才能看到自己的评论
              this.pageIndex = 1;
              //重新获取评论
              this.getComment();
            } else {
            }
          });
      }
    },
    //加入购物车
    add2Cart(){
        this.$store.commit('add2Cart',{
            goodId:this.artID,
            goodNum:this.buyCount
        })
    }
  },

  //生命周期函数
  created() {
    this.initData();
  },
  //侦听器
  watch: {
    $route(newVal, oldval) {
        //设置图片数组为空 让放大镜组件 重新生成
        this.images.normal_size=[];
      this.initData();
    }
  }
};
</script>
<style>
.tab-content img {
  display: block;
  max-width: 100%;
}
.ivu-back-top span {
  font-size: 100px;
  display: block;
  transform: rotateZ(-45deg);
}
.inline-zoomer-zoomer-box{
    width: 395px;
}
.thumb-list img{
    width: 170px;
    height: 170px;

}
</style>


