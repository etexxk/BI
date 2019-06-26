Vue.component('filter_bar',{
     props:['show','item'],
     data:function(){

        return {
            self_show: false,
            data:{ },
            where:{
                by:'filter',  //filter/name/key/
                filter:{
                    search_box:{
                        search_str: "",
                        status: 0, //0,1
                        status_ctr:{
                            0: {
                                counting:true,
                                tag:true,
                                icon:true,
                                s_box:false,
                                close:false
                            },
                            1: {
                                counting:false,
                                tag:false,
                                icon:true,
                                s_box:true,
                                close:true
                            }
                        }
                    },
                    select_all:0, //0,1,2
                },
                name:{
                    data:{
                        selected: '之间',
                        input_list: []
                    }
                },
                key:{
                    by: 'sales', //sales,num
                    data:{
                        selected: '之间',
                        input_list: []
                    }
                },
                sort:{
                    active: 'none',//none/dec/asc
                }
            }
        };
     },
     components:{
         drop_bar
     },
     created:function(){
         Vue.set(this.item,'filter',[{key:1,name:'aaa'},{key:2,name:'bbb'}]);
         Vue.set(this.item,'filter_list',[{key:1,name:'aaa'},{key:2,name:'bbb'},{key:3,name:'ccc'},{key:4,name:'ddd'}]);
     }, 
     beforeUpdate: function(){
         if(!this.item.filterOption){
             this.item['filterOption'] = { by:'filter', data:{} };
         }
     },
     watch: {
         show: function(){
             this.self_show = this.show;
         },
         'where.by':{
             handler: function(n_val,o_val){
                 this.filterChange(n_val);
             },
             deep:true
         },
         'where.name':{
             handler: function(n_val,o_val){
                 this.filterChange('name');
             },
             deep:true
         },
         'where.key':{
             handler: function(n_val,o_val){
                 this.filterChange('key')
             },
             deep:true
         },
     },
     methods: {
        filterChange: function(type){
            this.item.filterOption.by = type;
            
            if(type == 'filter'){
               this.item.filterOption.data = {};
            }else{
               this.item.filterOption.data = this.where[type];
            }
        },
        searchList: function(text){
            this.where.filter.search_box.search_str = text;
            //ajax s
            var list = [{"key":11,"name":"aabaa"},{"key":2,"name":"aabbb"},{"key":333,"name":"daccc"},{"key":334,"name":"acddd"}].filter(function(ele){return ele.name.indexOf(text) != -1});
            //ajax e
            
            this.item.filter = this.item.filter_list = list;
        },
        searchActive: function(){
           Vue.set(this.where.filter.search_box,"status",1);
        },
        searchBure: function(){
           Vue.set(this.where.filter.search_box,"status",0);
           //ajax
           this.item.filter = this.item.filter_list = [{"key":1,"name":"aaa"},{"key":2,"name":"bbb"},{"key":3,"name":"ccc"},{"key":4,"name":"ddd"}];
        },
        selectAll: function(){
            this.where.filter.select_all = !this.where.filter.select_all;
            this.$nextTick(function(){
                if(this.where.filter.select_all){
                   Vue.set(this.item,'filter',this.item.filter_list);
                }else{
                   this.item.filter = [];
                }  
            })
        },
        filterBtnBy: function(active_name){
            if(this.where.by != active_name){
                Vue.set(this.where,'by',active_name);
            }else{
                Vue.set(this.where,'by','filter');
            }
        },
        filterBtnClear: function(){
            Vue.set(this.where,'by','filter');
            Vue.set(this.where,'name',{});
            Vue.set(this.where,'key',{});
        },
        filterBtnSort: function(sort_by){
            Vue.set(this.where.sort,'active',sort_by);

            if(this.item.filter_list){
                if(sort_by === 'asc'){
                    this.item.filter_list = this.item.filter_list.sort(function(a,b) { return (a.name > b.name) ? 1 : -1; });
                }else if(sort_by === 'dec'){
                    this.item.filter_list = this.item.filter_list.sort(function(a,b) { return (b.name > a.name) ? 1 : -1; });
                }
            }
            
        }
     },
     template:`<div v-if="self_show" class='filter_bar'>
                <div class="filter_head">
                    <span class="item_name"><span>{{item.name}}</span></span>
                    <span class="btns">
                        <span class="btn btn-sm btn-info" @click="$emit('close_this',false)">确定</span>
                        <span class="btn btn-sm btn-default filter_close" @click="$emit('close_this',false)">关闭</span>
                    </span>
                </div>

                <div class="filter_body">
                    <div class="filter_ctr">
                        <div>
                            <span>过滤:</span>
                            <span :class="['btn btn-sm btn-default',{'active':(where.by === 'name')}]" style="margin-left:70px;width:70px;color:black;" @click="filterBtnBy('name')">标签</span>
                            <span :class="['btn btn-sm btn-default',{'active':(where.by === 'key')}]" style="margin-left:20px;width:70px;color:black;" @click="filterBtnBy('key')">值</span>
                        </div>
                        <div>
                            <div class="btn btn-group pull-right" style="padding:0;position:relative;top:-1px;">
                                <span :class="['btn','btn-sm','btn-default',{active:where.sort.active === 'asc'}]" style="width:50px;" @click="filterBtnSort('asc')">AZ</span>
                                <span :class="['btn','btn-sm','btn-default',{active:where.sort.active === 'dec'}]" style="width:50px;" @click="filterBtnSort('dec')">ZA</span>
                            </div>
                        </div>
                    </div>

                    <div class="ctr_list">
                        <div class="ctr_list_ele" id="ctr_list_ele_filter" v-if="where.by === 'filter'">
                            <div class="filter_h">
                                <div class="filter_h_tag">
                                    <label 
                                        style="margin-bottom:0px;margin-left:5px;cursor:pointer;">
                                    <input type="checkbox" :value="where.filter.select_all" @click="selectAll"/>&nbsp; &nbsp; 全选</label>
                                </div>

                                <div class="filter_b_search">
                                    <div
                                        v-if="where.filter.search_box.status_ctr[where.filter.search_box.status].counting"
                                        class="filter_counter"
                                        style="flex-grow:1;padding-top:6px;"
                                    >
                                        已选{{item.filter.length}}共{{item.filter_list.length}}
                                    </div>
                                    <div class="filter_search" :style="{'flex-grow':1,'background':where.filter.search_box.status ? 'white' : 'none'}">
                                        <span 
                                            v-if="where.filter.search_box.status_ctr[where.filter.search_box.status].tag"
                                            style="flex-grow:1;border-left:1px solid #ccc;padding: 5px;"
                                        >搜索</span>
                                        <span
                                            v-if="where.filter.search_box.status_ctr[where.filter.search_box.status].icon"
                                            :style="{'font-size':'17px','cursor':'pointer','flex-grow':1,top:0,'padding-left': '5px','border-left':where.filter.search_box.status ? '1px solid #ccc' : ''}"
                                            @click="searchActive"
                                        ><span class="glyphicon glyphicon-search"></span></span>
                                        <span v-if="where.filter.search_box.status_ctr[where.filter.search_box.status].s_box" style="width:60%;flex-grow:2;">
                                            <input type="text" style="border:0px;height:20px;width:100%;outline:none;" :value="where.filter.search_box.search_str" @input.lazy="searchList($event.target.value)"/>
                                        </span>
                                        <span v-if="where.filter.search_box.status_ctr[where.filter.search_box.status].close"
                                            class="s_close"
                                            style="height:32px;cursor: pointer;flex-grow:1;"
                                            @click="searchBure"
                                            ></span>
                                    </div>
                                </div>
                            </div>
                            <div class="filter_b">
                                <div v-for="(val,i) in item.filter_list" v-bind:key="i">
                                    <label><input type="checkbox" :value="val" v-model="item.filter"/>&nbsp; &nbsp; {{val.name}}</label>
                                </div>
                            </div>
                        </div>

                        <div class="ctr_list_ele" id="ctr_list_ele_name" v-if="where.by === 'name'">
                              <drop_bar v-bind:item="where.name.data" @valuesChange="item.filterOption.data.data = $event"></drop_bar>
                              <div class="filter_btn_clear"><span class="pull_right" @click="filterBtnClear">清除标签过滤器</span></div>
                        </div>

                        <div class="ctr_list_ele"  id="ctr_list_ele_key" v-if="where.by === 'key'">
                              <div style = "padding:10px 10px 0px 10px;">
                                 <label><input type="radio" name="type" value="sales" v-model="item.filterOption.data.by" checked/>销售额的和</label> 
                                 <label><input type="radio" name="type" value="num" v-model="item.filterOption.data.by" />销量的和</label> 
                              </div>

                              <drop_bar v-bind:item="where.key.data" @valuesChange="item.filterOption.data.data = $event"></drop_bar>

                              <div class="filter_btn_clear"><span class="pull_right" @click="filterBtnClear">清除值过滤器</span></div>
                        </div>
                    </div>

                </div>
             </div>`
});