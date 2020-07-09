import React, { Component } from 'react';
import LikeItem from "../LikeItem";
import Loading from '../../../../components/Loading';
import "./style.css"

class LikeList extends Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef();

        this.removeListener = false
    }
    render() {
        const { data, pageCount } = this.props;
        // const { data, pageCount,isFetching } = this.props;
        // console.log("likelist",this.props)
        // console.log("isFetching",isFetching)
        return (
            <div ref={this.myRef} className="likeList">
                <div className="likeList__header">猜你喜欢</div>
                <div className="likeList__list">
                    {
                        data.map((item, index) => {
                            return <LikeItem key={index} data={item} />
                        })
                    }
                    {
                        pageCount < 3 ? (
                            <Loading />
                        ) : (
                                <a className="likeList__viewAll" href=" ">查看更多</a>
                            )

                    }
                </div>
            </div>
        );
    }


    //在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。 如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异步操作阻塞UI)。
    componentDidMount(){
        if(this.props.pageCount <3){
            document.addEventListener("scroll",this.handleScroll);
        }else{
            this.removeListener =  true
        }
        if(this.props.pageCount === 0){
            this.props.fetchData()
        }
    }

    //在组件完成更新后立即调用。在初始化时不会被调用。
    componentDidUpdate(){
        if(this.props.pageCount >= 3 && !this.removeListener){
            document.removeEventListener("scroll",this.handleScroll);
            this.removeListener = true
        }
    }

    //在组件从 DOM 中移除之前立刻被调用
    componentWillUnmount(){
        if(!this.removeListener) {
            document.removeEventListener("scroll", this.handleScroll)
          }
    }


    handleScroll = () => {
        //页面滚动距离
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        //可视区域高度
        const screenHeight = document.documentElement.clientHeight;
        //likeList距离页面顶部的距离
        const likeListTop = this.myRef.current.offsetTop;
        //likeList内容高度
        const likeListHeight = this.myRef.current.offsetHeight;

        if(scrollTop >= likeListTop + likeListHeight - screenHeight){
            this.props.fetchData()
            // const newData = this.state.data.concat(dataSource);
            // const newLoadTimes = this.state.loadTimes + 1;
            // setTimeout(()=>{
            //     this.setState({
            //         data:newData,
            //         loadTimes:newLoadTimes
            //     })
            // },1000)
            
        }
    }
}

export default LikeList;