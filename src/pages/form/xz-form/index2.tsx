import React, { useState, useEffect } from 'react';
import ProForm from '@ant-design/pro-form';
import type { ProFormColumnsType, ProFormLayoutType } from '@ant-design/pro-form';
import { BetaSchemaForm, ProFormSelect } from '@ant-design/pro-form';



type DataItem = {
  name: string;
  state: string;
};

export default () => {
  const columns: ProFormColumnsType<DataItem>[] = [
    {
      title: '起始标记位',
      valueType: 'formList',
      dataIndex: 'startRemarkJsons',
      columns: [
        {
          valueType: 'group',
          columns: [
            {
              dataIndex: 'fieldName',
              valueType: 'text',
              width: 'xs',
              formItemProps: {
                rules: [
                  {
                    required: true,
                    message: '此项为必填项',
                  },
                ],
              },
              fieldProps:{
                placeholder:"字段名",
              }
            },
            {
              dataIndex: 'fieldValue',
              valueType: 'text',
              width: 'xs',
              formItemProps: {
                rules: [
                  {
                    required: true,
                    message: '此项为必填项',
                  },
                ],
              },
              fieldProps:{
                placeholder:"字段值",
              }
            },
            {
              dataIndex: 'fieldType',
              valueType: 'text',
              width: 'xs',
              formItemProps: {
                rules: [
                  {
                    required: true,
                    message: '此项为必填项',
                  },
                ],
              },
              fieldProps:{
                placeholder:"字段类型",
              }
            }
          ],
        },
      ],
    },
    {
      title: '标题',
      dataIndex: 'title2',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      width: 'm',
    }
  ];

  return (
        <ProForm
          layout={'horizontal'}
          size={'middle'}
          onFinish={(values) => {
            console.log(values, 'xz66');
          }}
        >
          <BetaSchemaForm<DataItem>
            trigger={<a>点击我</a>}
            columns={columns}
            layoutType={'Embed'}
          />
        </ProForm>
  );
};
