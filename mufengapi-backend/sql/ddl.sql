create table if not exists mufengapi.`user_interface_info`
(
    `id` bigint not null auto_increment comment 'id' primary key,
    `userId` bigint not null comment '用户id',
    `interfaceInfoId` bigint not null comment '接口id',
    `status` tinyint default 0 not null comment '0-正常 1-禁用',
    `totalNum` int default 0 not null comment '总调用次数',
    `leftNum` int default 0 not null comment '剩余调用次数',
    `create_time` datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    `update_time` datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    `is_deleted` tinyint default 0 not null comment '是否删除(0-未删, 1-已删)'
) comment '用户调用接口信息';