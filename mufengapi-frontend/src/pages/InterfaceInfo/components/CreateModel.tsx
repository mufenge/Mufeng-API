import {
  ModalForm, ProColumns,
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Modal } from 'antd';
import React from 'react';
import interfaceInfo from "@/pages/InterfaceInfo";


export type Props = {
  columns:  ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: interfaceInfo) => Promise<void>;
  visable: boolean;
  values: Partial<API.RuleListItem>;
};

const CreateModel: React.FC<Props> = (props) => {
  const intl = useIntl();
  return (
    <ModalForm
      title={intl.formatMessage({
        id: 'pages.searchTable.createForm.newRule',
        defaultMessage: 'New rule',
      })}
      width="400px"
      open={createModalOpen}
      onOpenChange={handleModalOpen}
      onFinish={async (value) => {
        const success = await handleAdd(value as API.RuleListItem);
        if (success) {
          handleModalOpen(false);
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }
      }}
    >
      <ProFormText
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="pages.searchTable.ruleName"
                defaultMessage="Rule name is required"
              />
            ),
          },
        ]}
        width="md"
        name="name"
      />
      <ProFormTextArea width="md" name="desc" />
    </ModalForm>
  );
};

export default CreateModel;
