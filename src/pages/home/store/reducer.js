import { fromJS } from 'immutable'
const defaultState = fromJS({
    topicList: [],
    articleList:[],
    recommendList:[],
    articlePage: 0,
    showScroll: false,
})

export default (state = defaultState,action) => {
    switch (action.type) {
        case 'change_home_data':
            //immutable中的merge方法用于合并赋值，fromJS方法用于将类型转换为immutable类型
            return state.merge({
                topicList: fromJS(action.topicList),
                articleList: fromJS(action.articleList),
                recommendList : fromJS(action.recommendList)
            })
        case 'add_article_list':
            return state.merge({
                'articleList': state.get('articleList').concat(action.list),
                'articlePage': action.nextPage
            })
        case 'toggle_scroll_top':
            return state.set('showScroll',fromJS(action.show))
        default:
            return state;
    }
}