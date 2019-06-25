var drop_bar = {
     props:['show','item'],
     data:function(){
        return {
            data:{
                selected:'之间',
                input_list:[],
            },
            list_show:false,
            list:{
                '顶部': {
                    num:1,
                    value1:Number
                },
                '底部': {
                    num:1,
                    value1:Number
                },
                '等于': {
                    num:1,
                    value1:String
                },
                '不相等': {
                    num:1,
                    value1:String
                },
                '大于': {
                    num:1,
                    value1:Number
                },
                '大于或等于':  {
                    num:1,
                    value1:Number
                },
                '小于':  {
                    num:1,
                    value1:Number
                },
                '少于或等于':  {
                    num:1,
                    value1:Number
                },
                '之间': {
                    num:2,
                    value1:Number,
                    value2:Number
                },
                '不介于': {
                    num:2,
                    value1:Number,
                    value2:Number
                },
            }
        };
     },
     mounted: function(){
         //console.log(this.list[this.data.selected]);
         
     },
     methods: {
        dropSelected:function(select){
            this.data.selected = select;
            this.data.input_list = this.data.input_list.slice(0,this.list[select]);
            this.dropClose();
        },
        dropShow:function(){
            this.list_show = true;
            this.data.input_list = [];
        },
        dropClose: function(){
            this.list_show = false;
        }
     },
     template:`<div class="drop_list" :style = "{'flex-grow':list[data.selected].num + 1}">
                   <div class="drop_ele drop_btn" :style = "{width:'calc(100% / '+ (list[data.selected].num + 1) +' - 20px)'}">
                        <div @click="dropShow" style="text-align:center;">{{data.selected}}</div>
                        <ul v-if="list_show">
                            <li v-for="(input_show,methods) in list" @click="dropSelected(methods)">{{methods}}</li>
                        </ul>
                    </div>
                    <input class="drop_ele" v-for="i in list[data.selected].num" v-model="data.input_list[i]" type="text" :style = "{width:'calc(100% / '+ (list[data.selected].num + 1) +' - 20px)'}"/>
               </div>`
};