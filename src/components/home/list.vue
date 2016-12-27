<template>
	<svg :width='width' :height='height' @click='updateData()' class="aa">
		<path :d='line'></path>
		<template v-for='item in list' >
			<circle :r='item.r' :fill='item.fill' :cx="item.cx" :cy="item.cy"></circle>
		</template>
	</svg>
</template>
<script>
	import Vue from 'vue';
	import Vuex from 'vuex';
	import _ from 'lodash';
	var d3 = Object.assign({}, require("d3-array"), require("d3-scale"), require("d3-shape"));
	Vue.use(Vuex);
	export default {
		data:function(){
			return {
				width:400,
				height:200,
				data:[100, 80, 40, 10, 30, 90],
				list:[],
				line:''
			}
		},
		computed:Vuex.mapGetters({
	        name : 'name'
	    }),
	    mounted() {
	    	var width = this.$parent.$el.offsetWidth;
	    	var height = this.$parent.$el.offsetHeight;
	    	this.width = width;
	    	this.height = height;
		    this.calculatePath();
		},
		methods: {
			updateData(){
				var _this=this;
				_.each(_this.data,function(d,i){
					_this.data[i] = ~~(Math.random()*100);
				});
				this.calculatePath();
			},
		    getScales() {
		    	const width = this.width;
		    	const height = this.height;
				const x = d3.scaleTime().range([0, width]);
				const y = d3.scaleLinear().range([height, 0]);
				x.domain(d3.extent(this.data, (d, i) => i));
				y.domain([0, d3.max(this.data, d => d)]);
				return { x, y };
		    },
		    calculatePath() {
		    	const scale = this.getScales();
		    	this.list = _.map(this.data,(d,i)=>{
		    		return {
						r:2,
						fill:'#f0f',
						cx:scale.x(i),
						cy:scale.y(d)
					}
		    	});

		      const path = d3.line()
		        .x((d, i) => scale.x(i))
		        .y(d => scale.y(d));
		      this.line = path(this.data);
		    }
		}
	}
</script>
<style lang="css" scoped>
	.aa path{
		stroke:#f00;
		stroke-width:1px;
		fill:none;
		shape-rendering:geometricPrecision;
	}
</style>