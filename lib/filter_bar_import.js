var filter_bar = {
     props:['show','item'],
     data:function(){

        return {
            self_show: false,

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
                    select_all:0, //0.1.2
                },
                name:{

                },
                key:{   

                },
            }
        };
     },
     created:function(){
         Vue.set(this.item,'filter',[{key:1,name:'aaa'},{key:2,name:'bbb'}]);
         Vue.set(this.item,'filter_list',[{key:1,name:'aaa'},{key:2,name:'bbb'},{key:3,name:'ccc'},{key:4,name:'ddd'}]);
     }, 
     mounted: function(){

     },
     watch: {
         show: function(){
             this.self_show = this.show;
         }
     },
     methods: {
        searchActive:function(){
           Vue.set(this.where.filter.search_box,"status",1);
        },
        searchBure:function(){
           Vue.set(this.where.filter.search_box,"status",0);
        },
        selectAll:function(){
            this.where.filter.select_all = !this.where.filter.select_all;
            this.$nextTick(function(){
                if(this.where.filter.select_all){
                   this.item.filter = this.item.filter_list;
                }else{
                   this.item.filter = [];
                }  
            })
        }
     },
     template:`<div v-if="self_show" class='filter_bar'>
                <div class="filter_head">
                    <span class="item_name"><span>{{item.name}}</span></span>
                    <span class="btns">
                        <span class="btn btn-sm btn-info" @click="$emit('close_this',false)">确定</span>
                        <span class="btn btn-sm btn-default filter_close" @click="$emit('close_this',false)">取消</span>
                    </span>
                </div>

                <div class="filter_body">
                    <div class="filter_ctr">
                        <div>
                            <span>过滤:</span>
                            <span class="btn btn-sm btn-default" style="margin-left:70px;width:70px;color:black;">标签</span>
                            <span class="btn btn-sm btn-default" style="margin-left:20px;width:70px;color:black;">值</span>
                        </div>
                        <div>
                            <div class="btn btn-group pull-right" style="padding:0;position:relative;top:-1px;">
                                <span class="btn btn-sm btn-default" style="width:50px;">AZ</span>
                                <span class="btn btn-sm btn-default" style="width:50px;">ZA</span>
                            </div>
                        </div>
                    </div>

                    <div class="ctr_list">
                        <div class="ctr_list_ele" id="ctr_list_ele_filter">
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
                                            <input type="text" style="border:0px;height:20px;width:100%;outline:none;"/>
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
                                <div v-for="(val,i) in item.filter_list">
                                    <label><input type="checkbox" :value="val" v-model="item.filter"/>&nbsp; &nbsp; {{val.name}}</label>
                                </div>
                            </div>
                        </div>

                        <div class="ctr_list_ele"  id="ctr_list_ele_name">
                            name    
                        </div>

                        <div class="ctr_list_ele"  id="ctr_list_ele_key">
                            key
                        </div>
                    </div>

                </div>
             </div>`
}

export default filter_bar;