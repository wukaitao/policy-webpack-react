//请求Action(Request)
export const AllPointData = 'AllPointData';//查询所有节点数据

export const ModifyPoint = 'ModifyPoint';//修改节点
export const ModifyCate = 'ModifyCate';//修改分类
export const SaveCreatePointData = 'SaveCreatePointData';//保存创建节点数据
export const SaveModifyPointData = 'SaveModifyPointData';//保存修改节点数据
export const SaveCreateCateData = 'SaveCreateCateData';//保存创建分类数据
export const SaveModifyCateData = 'SaveModifyCateData';//保存修改分类数据

export const PolicyListData = 'PolicyListData';//获取policy列表
export const PolicyDetail = 'PolicyDetail';//policy详情
export const PolicySave = 'PolicySave';//修改/创建policy
export const PolicyInitChosen = 'PolicyInitChosen';//初始化节点选择
export const PolicyFilterChosen = 'PolicyFilterChosen';//过滤节点选择
export const PolicyRefreshOrder = 'PolicyRefreshOrder';//重新排序
export const HospitalList = 'HospitalList';//获取医院列表
export const DeletePolicy = 'DeletePolicy';//删除policy
export const SubmitPDF = 'SubmitPDF';//提交policy
export const CreatePdf = 'CreatePdf';//生成pdf
export const SendPdf = 'SendPdf';//发送pdf
export const DialogOpen = 'DialogOpen';//打开弹窗
export const DialogCancel = 'DialogCancel';//关闭弹窗
export const LoadingOpen = 'LoadingOpen';//打开Loading蒙层
export const LoadingCancel = 'LoadingCancel';//关闭Loading蒙层

export const Login = 'Login';//登录
export const Logout = 'Logout';//退出

//操作Action(Event)
//保单管理
export const ChooseAllPolicy = 'ChooseAllPolicy';//全选保单
export const ChooseInvert = 'ChooseInvert';//反选保单
export const ChangePolicyChosen = 'ChangePolicyChosen';//选择保单
export const ResetSearchType = 'ResetSearchType';//重置搜索类型
export const ChangeSearchType = 'ChangeSearchType';//切换搜索类型
//保单编辑
export const ChangePolicyName = 'ChangePolicyName';//policy名称
export const ChangeShow = 'ChangeShow';//切换节点显示状态
export const ChangeContent = 'ChangeContent';//policy内容
export const ChangeIsPrev = 'ChangeIsPrev';//切换责任限额
export const ChooseHospital = 'ChooseHospital';//选中医院
export const AddHospital = 'AddHospital';//添加医院
export const RemoveHospital = 'RemoveHospital';//移除医院
export const AddExpHospital = 'AddExpHospital';//添加所有昂贵医院
export const RemoveExpHospital = 'RemoveExpHospital';//移除所有昂贵医院
export const HosSelectedAllLeft = 'HosSelectedAllLeft';//全选所有医院
export const HosSelectedAllRight = 'HosSelectedAllRight';//全选选中医院
