# Seedable Random Avatar Generator

- Forked from https://www.npmjs.com/package/random-avatar-generator

- Changes in the fork will likely end up there as well.

- Generates random avatars from the website https://getavataaars.com/

## Usage

### Simple 

```typescript
import { getRandomAvatar } from 'seedable-random-avatar-generator';

// Returns get a url for a random avatar
getRandomAvatar();
```

### With a seed

For instance, if you want to generate a random avatar for a user id/email which stays the same each time.


```typescript
import { getRandomAvatar } from 'seedable-random-avatar-generator';

getRandomAvatar('avatar'); 

```

In the example above, specifying the seed `avatar` results in this image: -

![avatar](https://avataaars.io/?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Blue01&clotheType=Hoodie&eyeType=EyeRoll&eyebrowType=RaisedExcitedNatural&facialHairColor=Blonde&facialHairType=BeardMagestic&hairColor=Black&hatColor=White&mouthType=Sad&skinColor=Yellow&topType=ShortHairShortWaved "Avatar with seed 'avatar'")

```https://avataaars.io/?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Blue01&clotheType=Hoodie&eyeType=EyeRoll&eyebrowType=RaisedExcitedNatural&facialHairColor=Blonde&facialHairType=BeardMagestic&hairColor=Black&hatColor=White&mouthType=Sad&skinColor=Yellow&topType=ShortHairShortWaved```