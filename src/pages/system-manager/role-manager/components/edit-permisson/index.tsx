import React from 'react'
import { Tree, Icon } from 'antd'

const { TreeNode } = Tree

interface IProps {
  permissionData: any[]
  checkedPermissions: string[]
  changePermissions: (checkedKeys: string[]) => void
}

interface IState {
  checkedKeys: string[]
}
class EditPermission extends React.PureComponent<IProps, IState> {
  state = {
    checkedKeys: this.props.checkedPermissions
  }
  onCheck = (checkedKeys: string[]) => {
    this.setState({
      checkedKeys
    })
    this.props.changePermissions(checkedKeys)
  }
  render() {
    const { permissionData, checkedPermissions } = this.props
    const { checkedKeys } = this.state
    return (
      <Tree
        checkable
        showLine
        showIcon
        checkedKeys={checkedKeys.length ? checkedKeys : checkedPermissions}
        // @ts-ignore
        onCheck={this.onCheck}
      >
        {permissionData.map(item => (
          <TreeNode
            title={item.name}
            key={item.id}
            icon={<Icon type='folder-open' />}
          >
            {item.children && item.children.length
              ? item.children.map((it: any) => (
                  <TreeNode
                    title={it.name}
                    key={it.id}
                    icon={<Icon type='profile' />}
                  />
                ))
              : null}
            }
          </TreeNode>
        ))}
      </Tree>
    )
  }
}

export default EditPermission
