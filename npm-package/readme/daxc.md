# daxc
**AccessControl** with Functional Operations (Higher-order Function) Implementation

## Overview

**daxc** is **AccessControl** that provides **Access** on **Resources** based on **Roles** and **Attributes**. It implements **Functional Operations**.

## Concepts

- [Access](#access)
  - [Accessible](#accessible)
  - [Permissions and Subjects](#permissions-and-subjects)
- [Resources](#resources)
- [Roles](#roles)
- [Identity](#identity)
- [Resource](#resource)

### Access

In **daxc**, **Access** describes **_the capabilities to access_ any Resources**. **daxc** defines **three** access capabilities: _Accessible_, _Permissions_, and _Subjects_. Let's dive deep into these three access capabilities:

- **Accessible**: determines _whether Resource can be accessed_
- **Permissions**: defines _actions_ or _activities permissions_ on Resource
- **Subjects**: defines _read_ and _write capabilities on any subject_ in Resource

```typescript
type Access = {
  accessible: boolean;
  permissions: { [permission: string]: PermissionsType; };
  subjects: { [subject: string]: SubjectsType; };
};
```

#### Accessible

It's a simple **access capability** that simply describes **_whether the Resource can be accessed_**.

#### Permissions and Subjects

In **daxc**, the **Permissions** and **Subjects** can be _defined as any type of values_. However, **daxc** defines common **Permissions** and **Subjects** as following:

- **Permissions**
  - **All**: Permission is granted
  - **Attribute**: Permission is granted based on **Attributes** (of _Identity_ and _Resource_)
  - **Owner**: Permission is granted only **Owner**
  - **None**: Permission is **NOT** granted

- **Subjects**
  - **Read_Write**: Subject can be **read** or **written**
  - **Read_WriteAttribute**: Subject can be **read**, but **write** is granted based on **Attributes** (of _Identity_ and _Resource_)
  - **Read_WriteOwner**: Subject can be **read**, but **write** is granted to **Owner**
  - **ReadAttribute_WriteAttribute**: Subject can be **read** or **written** based on **Attributes** (of _Identity_ and _Resource_)
  - **ReadAttribute_WriteOwner**: Subject can be **read** based on **Attributes** (of _Identity_ and _Resource_), but **write** is granted to **Owner**
  - **ReadOwner_WriteOwner**: Subject can be **read** or **written** by **Owner**
  - **ReadOnly**: Subject can be **read** only
  - **ReadAttributeOnly**: Subject can be **read** based on **Attributes** (of _Identity_ and _Resource_) only
  - **ReadOwnerOnly**: Subject can be  **read** by **Owner** only
  - **None**: Subject cannot be **read** nor **written**

[Back to Concepts](#concepts)

### Resources

In **daxc**, **Resources** represent **any resource that requires _different_ access capabilities**. **Resources** require **name** (_resource_) and **Access** with default values.

**Resources can be anything!** It can be pages of websites, components in module, or any data in application.

```typescript
type ApplicationState = {
  resources: {
    [resource: string]: Access;
  };
};
```

**Examples #1**: Products, as **Resources**, can usually be **_accessed_** and **_listed_** by anyone, but not be **_deleted_**.

```typescript
const ApplicationState = {
  resources: {
    Products: {
      accessible: true,
      permissions: {
        List: PERMISSIONS.All,
        Delete: PERMISSIONS.None,
      }
    }
  }
};
```

[Back to Concepts](#concepts)

### Roles

In **daxc**, **Roles** represent **any role that has alternative Access**. **Roles** provides possibilities to have alternative Access from **Resources Access** as _the result of reducing function_. **Roles** requires **name** (_role_).

To alternate **Resource Access**, specify the **Resource** and **Role Access**: _Accessible_, _Permissions_, and _Subjects_ for that **Role**.

```typescript
type ApplicationState = {
  roles: {
    [role: string]: {
      resources: {
        [resource: string]: Access;
      };
    };
  };
};
```

**Examples #2**: Marketings and Accountants can **_change_** Products. Only Accountants can set **Price**. Because the **Cost** in Product is sensitive information, only Accountants can **_see_** and **_set_**.

```typescript
const ApplicationState = {
  resources: {
    Products: {
      accessible: true,
      permissions: {
        List: PERMISSIONS.All,
        Delete: PERMISSIONS.None,
        Edit: PERMISSIONS.None,
      },
      subjects: {
        Price: SUBJECTS.ReadOnly,
        Cost: SUBJECTS.None,
      }
    }
  },
  roles: {
    Marketings: {
      resources: {
        Products: {
          permissions: {
            Edit: PERMISSIONS.All,
          },
          subjects: {
            Price: SUBJECTS.Read_Write,
          }
        }
      }
    },
    Accountants: {
      resources: {
        Products: {
          permissions: {
            Edit: PERMISSIONS.All,
          },
          subjects: {
            Price: SUBJECTS.Read_Write,
            Cost: SUBJECTS.Read_Write,
          }
        }
      }
    }
  },
};
```

[Back to Concepts](#concepts)

### Identity

In **daxc**, **Identity** represents **any entity** that _requests to access_ **Resources**. **Identity** requires **roles** property.

```typescript
type Identity = {
  roles: string[];
};
```

#### toIdentity()

In case that **Identity** in current application has _no **roles** properties_, it can be provided via function, **() => Identity** as **toIdentity()**. 

```typescript
const currentIdentity = {
  ...
  organization: 'SampleRole',
  ... 
};

const toIdentity = (currentIdentity) => ({ roles: [ currentIdentity.organization ] });
// { roles: ['SampleRole'] } as result
```

[Back to Concepts](#concepts)

### Resource

In **daxc**, **Resource** represents **any entity** which **Identity** _requests access to_. **Resource** requires **name** property.

```typescript
type Resource = {
  name: string;
};
```

#### toResource()

In case that **Resource** in current application has _no **name** properties_, it can be provided via function, **() => Resource** as **toResource()**. 

```typescript
const currentResource = {
  ...
};

const toResource = (currentResource) => ({ name: 'SampleResource' });
// { name: 'SampleResource' } as result
```

[Back to Concepts](#concepts)

## Application State
It's easy to understand an application when we know the **Application State**.

```typescript
type ApplicationState = {
  resources: {
    [resource: string]: {
      accessible: boolean;
      permissions: { [permission: string]: PermissionsType; };
      subjects: { [subject: string]: SubjectsType; };
    };
  };
  roles: {
    [role: string]: {
      resources: {
        [resource: string]: {
          accessible?: boolean;
          permissions?: { [permission: string]: PermissionsType; };
          subjects?: { [subject: string]: SubjectsType; };
        };
      };
    };
  };
};
```

## Process

#### IdentityAccess

```typescript
AccessControl(Identity) => IdentityAccess
```

**AccessControl** can provide **IdentityAccess** when it operates with **Identity** that has **roles**.

#### AccessDataReducer

```typescript
AccessDataReducing<T> = (accumulator: T, value: T, initial?: T, role?: string) => T;
```
