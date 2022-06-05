import React, { memo, useEffect, useMemo, useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import { Avatar, Form, Input, Button } from 'antd';
import { EditFilled, SaveFilled, CloseCircleFilled } from '@ant-design/icons';

import { useModal } from 'hooks';
import { useUpdateDevelopersMutation } from 'api';
import { Developer, ChangeableFields } from 'types';

import { StyledCard, Span } from 'Common';
import Loader from 'Components/Loader';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 32 },
};

function DeveloperCard({ id, name, age, exp, color, hobbies, avatar }: Developer) {
  const [isEditable, toggleEditable] = useModal(false);
  const [form] = Form.useForm<ChangeableFields>();
  const [updateDevelopers, { isLoading, isSuccess }] = useUpdateDevelopersMutation();

  const onUpdate = useCallback((values: ChangeableFields) => {
    const prevModel: Developer = { id, name, age, exp, color, hobbies, avatar };
    const currentModel: Developer = {
      id,
      name,
      avatar,
      age: values.age.trim(),
      exp: values.exp.trim(),
      color: values.color.trim(),
      hobbies: values.hobbies.trim(),
    };

    if (shallowEqual(prevModel, currentModel)) {
      return toggleEditable();
    }

    updateDevelopers(currentModel);
  }, []);

  const onSubmit = useCallback(
    () =>
      form
        .validateFields()
        .then((values) => {
          form.resetFields();
          onUpdate(values);
        })
        .catch((info) => {
          console.log('Validate Failed:', info);
        }),
    [form, onUpdate]
  );

  const actions = useMemo(
    () =>
      isEditable
        ? [
            <Button type="link" icon={<CloseCircleFilled />} onClick={toggleEditable} disabled={isLoading} />,
            <Button
              type="link"
              htmlType="submit"
              icon={<SaveFilled />}
              disabled={isLoading}
              onClick={onSubmit}
            ></Button>,
          ]
        : [<EditFilled key="edit" onClick={toggleEditable} />],
    [isEditable, toggleEditable, onSubmit, isLoading]
  );

  useEffect(() => {
    if (isEditable) {
      form.setFieldsValue({ age, exp, color, hobbies });
    } else {
      form.resetFields();
    }
  }, [isEditable, form, age, exp, color, hobbies]);

  useEffect(() => {
    if (isSuccess) {
      toggleEditable();
    }
  }, [isSuccess, toggleEditable]);

  return (
    <StyledCard width="300px" hoverable actions={actions} color={color} borderRadius="15px" minHeight="200px">
      <Avatar src={avatar} />
      <Span paddingLeft="50px">{name}</Span>
      {isLoading ? (
        <Loader />
      ) : (
        <Form {...layout} form={form}>
          <Form.Item label="Age">
            <Form.Item name="age" noStyle>
              <Input placeholder={age} hidden={!isEditable} />
            </Form.Item>
            {!isEditable && <Span>{age}</Span>}
          </Form.Item>
          <Form.Item label="Hobbies">
            <Form.Item name="hobbies" noStyle>
              <Input placeholder={hobbies} hidden={!isEditable} />
            </Form.Item>
            {!isEditable && <Span>{hobbies}</Span>}
          </Form.Item>
          <Form.Item label="Experience">
            <Form.Item name="exp" noStyle>
              <Input placeholder={exp} hidden={!isEditable} />
            </Form.Item>
            {!isEditable && <Span>{exp}</Span>}
          </Form.Item>
          <Form.Item label="Lovely color">
            <Form.Item name="color" noStyle>
              <Input placeholder={color} hidden={!isEditable} />
            </Form.Item>
            {!isEditable && <Span>{color}</Span>}
          </Form.Item>
        </Form>
      )}
    </StyledCard>
  );
}

export default memo(DeveloperCard);
