# Schema

### Project

| Field | Type | Description |
| --- | --- | --- |
| `projectID` | `UID` | Unique identifier of the project and acts as primary key |
| `name` | `String` | Project name alias |
| `projectOwner` | `Address` | The active address |
| `packageID` | `Address` | The address of the published package |
| `publisher` | `ObjectID` | Array of all publisher objects created for a collection. (TODO: Explore if we should start off with simple Address, what does this mean for future compatibility? |
| `upgradeCap` | `Address` | Address of the object that is used to upgrade the package |

### NFT Types

| Field | Type | Description |
| --- | --- | --- |
| `typeID` | `UID` |  |
| `projectID` | `UID` | Acts as foreign key |
| `typeName` | `String` | The type name of the struct |
| `adminObjects` | `Dictionary` |  |
| `collectionObjects` | `Dictionary` |  |

### Admin Objects

| Field | Type | Description |
| --- | --- | --- |
| `typeID` | `UID` | Foreign key |
| `mintCaps` | `Array[ObjectID]` |  |
| `transferPolicyCap` | `ObjectID` |  |
| `withdrawPolicyCap` | `ObjectID` |  |
| `borrowPolicyCap` | `ObjectID` |  |

### Collection Objects

| Field | Type | Description |
| --- | --- | --- |
| `typeID` | `UID` | Foreign key |
| `collection` | `ObjectID` |  |
| `royaltyBPS` | `ObjectID` |  |
| `allowlists` | `Array[ObjectID]` |  |
| `listing` | `ObjectID` |  |
| `warehouses` | `Array[ObjectID]` |  |
| `venues` | `Array[ObjectID]` |  |
| `transferPolicy` | `ObjectID` |  |
| `withdrawPolicy` | `ObjectID` |  |
| `borrowPolicy` | `ObjectID` |  |
