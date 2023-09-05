import { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-table/lib';
import { Modal } from 'antd';
import React, {useEffect, useRef} from 'react';
import {ProFormInstance} from "@ant-design/pro-form/lib";

export type Props = {
  values: API.User;
  columns: ProColumns<API.User>[];
  onCancel: () => void;
  onSubmit: (values: API.User) => Promise<void>;
  visible: boolean;
};

const ApplyToDevModal: React.FC<Props> = (props) => {
  const { values, visible, columns, onCancel, onSubmit } = props;

  const formRef = useRef<ProFormInstance>();
  useEffect(() => {
    if(formRef){
      formRef.current?.setFieldsValue(values);
    }

  }, [values]);

  return (
    <Modal open={visible} onCancel={() => onCancel?.()} footer={null}>
      <ProTable
        type="form"
        columns={columns}
        formRef={formRef}
        onSubmit={async (value) => {
          onSubmit?.(value);
        }}
      />
    </Modal>
  );
};

export default ApplyToDevModal;
