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
      title: '指定实例-库',
      dataIndex: 'assignAsset',
      valueType: 'select', //option
      request: async (params) => {
        return {
            SL1_K1: '实例一：库1',
            SL2_K2: '实例二：库2',
            SL3_K3: '实例三：库3',
          }
      },
      width: 'm',
      renderFormItem: (schema, config, form) => {
        return (
          <ProFormSelect
            // label="多选"
            valueEnum={config.options}
            // proFieldProps={{
            //   label:'22'
            // }}
            proFieldProps={{
                label:'aa'
            }}
            fieldProps={{
              mode: 'multiple',
              labelInValue:true
            }}
            showSearch={true}
            placeholder="请选择"
            rules={[{ required: true, message: '请选择', type: 'array' }]}
        />
        );
      }
    },
  ];

  return (
        <ProForm
          layout={'horizontal'}
          size={'middle'}
          onFinish={(values) => {
              values.assignAsset = values.assignAsset.map(item=>{
                let itemArr=item.split('_');
                return {
                    /**
                     * 库Id
                     */
                    databaseId: itemArr[0],
                    /**
                     * 实例Id
                     */
                    instanceId: itemArr[1],
                    /**
                     * 表Id
                     */
                    tableId: 'tableId'
                  }
              })

            console.log(values, 'xz888');

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
