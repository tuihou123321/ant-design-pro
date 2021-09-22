import React, { useState } from 'react';
import ProForm from '@ant-design/pro-form';
import type { ProFormColumnsType } from '@ant-design/pro-form';
import { BetaSchemaForm, ProFormSelect } from '@ant-design/pro-form';
import { Select } from 'antd';

const { Option, OptGroup } = Select;

type DataItem = {
  name: string;
  state: string;
};

const data=[
  {
    instanceId:1,
    instanceName:'实例一',
    schemaId:4,
    schemaName:'库1'
  },
  {
    instanceId:2,
    instanceName:'实例二',
    schemaId:5,
    schemaName:'库2'
  },
  {
    instanceId:3,
    instanceName:'实例三',
    schemaId:6,
    schemaName:'库3'
  }
]

function changeDataFormat(data){
  let obj={};
  data.map((item,index)=>{
    for(let i in item){
      obj[`${item['instanceId']}_${item['schemaId']}`]=`${item['instanceName']}:${item['schemaName']}`;
    }
    console.log(obj);
  })
  return obj;
}

export default () => {

  const [assignAsset, setAssignAsset]=useState([]);
  const columns: ProFormColumnsType<DataItem>[] = [
    {
      title: '指定实例-库',
      dataIndex: 'assignAsset',
      valueType: 'select', //option
      request: async (params) => {

        return changeDataFormat(data);

        //
        // const data = {
        //   SL1_K1: `实例一：库1`,
        //   SL2_K2: '实例二：库2',
        //   SL3_K3: '实例三：库3',
        // }
        // return  data;
      },
      width: 'm',
      renderFormItem: (schema, config, form) => {
        return (
          <Select style={{ width: 200 }}  onChange={(value)=>{
            setAssignAsset(value);
          }}  mode={'multiple'}>
            <OptGroup label="选择实例：  选择库">
              {
                (()=>{
                  let arr:any[]=[];
                  for(let i in config.options){
                    arr.push(<Option value={i} key={i}>{config.options[i]}</Option>);
                  }
                  return arr;
                })()
              }
            </OptGroup>
          </Select>
        );
      }
    },
  ];

  return (
        <ProForm
          layout={'horizontal'}
          size={'middle'}
          onFinish={(values) => {
            let newAssignAsset=[];
            if(assignAsset){
              newAssignAsset = assignAsset.map(item=>{
                let itemArr=item.split('_');
                return {
                  databaseId: itemArr[0],
                  instanceId: itemArr[1],
                  tableId: 'tableId'
                }
              })
            }
            const params = {
              ...values,
              assignAsset:newAssignAsset
            }
            console.log(params);
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
