# 高德地图

```vue
<template>
    <div class="container">
        <div class="map-container" id="map-container"></div>
        <div class="search-container">
            <div class="search">
                <el-input v-model="searchVal" class="search-input" prefix-icon="el-icon-search"
                    placeholder="请输入内容"></el-input>
            </div>
            <div class="address-list">
                <template v-if="context.nearAddress.length > 0">
                    <div class="address-item" v-for="addr in context.nearAddress" :key="addr.id"
                        @click="handleSelectAddress(addr)">
                        <div class="address">
                            <div>{{ addr.name }}</div>
                            <div class="detail">{{ addr.address }}</div>
                        </div>
                        <div class="icon">
                            <img src="@/assets/map/radio.png" v-if="selectAddress !== addr.id" />
                            <img src="@/assets/map/radio-select.png" v-else />
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
let map = null
let marker = null
window._AMapSecurityConfig = {
    securityJsCode: '65beafd8f295454d9bb2b7d8873ea3b7',
}
let currentIcon = null
export default {
    name: 'MapH5',
    data() {
        return {
            context: {
                position: null,
                pageInfo: {
                    pageIndex: 1,
                    total: 0
                },
                nearAddress: []
            },
            searchVal: '',
            selectAddress: ''
        }
    },
    created() {
        this.importMapApi().then(() => {
            this.initMap()
            currentIcon = new AMap.Icon({
                size: new AMap.Size(40, 50),    // 图标尺寸
                // image: '@/assets/map/location.png',
                // imageSize: new AMap.Size(40, 50), 
                content: "<img src=''@/assets/map/location.png' />"
            });
        })
    },
    watch: {
        searchVal: function (val) {
            this.searchByKeyword(val)
        }
    },
    methods: {
        handleSelectAddress(addr) {
            console.log(addr)
            this.selectAddress = addr.id
            this.changeCenter(addr.location)
        },
        importMapApi() {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script')
                script.src = 'https://webapi.amap.com/loader.js'
                // script.src = 'https://webapi.amap.com/maps?v=1.4.15&key=87b32977116fbf11601ca907c943f499'
                script.onload = () => {
                    resolve()
                }
                script.onerror = () => {
                    reject()
                }
                document.body.appendChild(script)
            })
        },
        initMap() {
            const that = this
            AMapLoader.load({
                "key": "87b32977116fbf11601ca907c943f499",              // 申请好的Web端开发者Key，首次调用 load 时必填
                "version": "2.0",   // 指定要加载的 JS API 的版本，缺省时默认为 1.4.15
                "plugins": ['AMap.Geolocation', 'AMap.PlaceSearch'],
            }).then((AMap) => {
                map = new AMap.Map('map-container', {
                    zoom: 18,
                    resizeEnable: true
                });
                map.on('click', function (e) {
                    that.changeCenter({
                        lng: e.lnglat.getLng(),
                        lat: e.lnglat.getLat()
                    })
                    // that.setCurrentMarker({
                    //     lng: e.lnglat.getLng(),
                    //     lat: e.lnglat.getLat()
                    // })
                });
                this.geolocation()
            }).catch((e) => {
                console.error(e);  //加载错误提示
            });
        },
        geolocation() {
            const that = this;
            var geolocation = new AMap.Geolocation({
                // 是否使用高精度定位，默认：true
                enableHighAccuracy: true,
                // 设置定位超时时间，默认：无穷大
                timeout: 10000,
                // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                buttonOffset: new AMap.Pixel(10, 20),
                //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                zoomToAccuracy: true,
                //  定位按钮的排放位置,  RB表示右下
                buttonPosition: 'RB'
            })

            geolocation.getCurrentPosition(function (status, result) {
                if (status == 'complete') {
                    onComplete(result)
                } else {
                    onError(result)
                }
            })

            function onComplete(data) {
                // data是具体的定位信息
                console.log('geolocation', data)
                that.changeCenter(data.position)
            }

            function onError(data) {
                // 定位出错
                console.log('geolocation error', data)
            }
        },
        changeMarker(position) {
            if (marker) {
                map.remove(marker)
            }
            marker = new AMap.Marker({
                position: this.createPosition(position),
            });
            map.add(marker)
        },
        setCurrentMarker(position) {
            const marker = new AMap.Marker({
                position: this.createPosition(position),
                icon: currentIcon,
                zoom: 13
            });

            map.add(marker);
        },
        changeCenter(position) {
            this.context.position = position
            map.setCenter(this.createPosition(position))
            this.changeMarker(position)
            // getCityInfo()
            this.searchNear()
            this.context.position = position
        },
        createPosition(position) {
            return new AMap.LngLat(position.lng, position.lat);
        },
        searchNear() {
            const context = this.context
            console.log('searchNear', context)
            const { pageInfo, position } = context
            var autoOptions = {
                //city 限定城市，默认全国
                // city: context.cityInfo.city,
                pageIndex: pageInfo.pageIndex
            }
            var placeSearch = new AMap.PlaceSearch(autoOptions);
            if(!position) return console.log('No position')
            const point = [position.lng, position.lat]
            placeSearch.searchNearBy('', point, 1000, function (status, result) {
                // 搜索成功时，result即是对应的匹配数据
                if (['complete', 'ok'].includes(status)) {
                    console.log(result)
                    context.pageInfo.total = result.poiList.count
                    context.nearAddress = result?.poiList?.pois
                } else {
                    log.error('根据经纬度查询地址失败')
                }
            })
        },
        searchByKeyword(keyword) {
            if (!keyword) return this.searchNear()
            const context = this.context
            const { pageInfo } = context
            var autoOptions = {
                //city 限定城市，默认全国
                city: '全国',
                pageIndex: pageInfo.pageIndex
            }
            var placeSearch = new AMap.PlaceSearch(autoOptions);
            placeSearch.search(keyword, function (status, result) {
                // 搜索成功时，result即是对应的匹配数据
                console.log(status, result)
                if (['complete', 'ok'].includes(status)) {
                    console.log(result)
                    context.pageInfo.total = result.poiList.count
                    context.nearAddress = result?.poiList?.pois
                } else {
                    log.error('根据经纬度查询地址失败')
                }
            })

        }
    }
}
</script>
<style lang="scss" scoped>
.container {
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    overflow: hidden;
}

.map-container {
    height: 50%;
    width: 100%;
}

.search-container {
    height: 50%;
    width: 100%;
    margin-top: 15px;
    display: flex;
    flex-direction: column;

    .search {


        .search-input {
            background: #F5F5F5;
        }
    }

    .address-list {
        flex: 1;
        overflow-y: scroll;

        .address-item {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            box-sizing: border-box;
            border-bottom: 1px solid #F1F2F6;
            padding: 10px;

            &:last-child {
                border-bottom: none;
            }

            .address {
                font-size: 15px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
                line-height: 21px;

                .detail {
                    font-size: 13px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #999999;
                    line-height: 18px;
                }
            }

            .icon {
                width: 16px;
                height: 16px;

                img {
                    height: 100%;
                }
            }
        }
    }
}</style>
```