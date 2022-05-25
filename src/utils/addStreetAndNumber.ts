import { User } from '../users/user.entity';

type UpgradedUser = User & { streetAndNumber: string };

export function addStreetAndNumber(user: User): User | UpgradedUser {
  if (user.address) {
    const updatedAddress = {
      streetAndNumber: `${user.address.street}, ${user.address.numberOfHouse}`,
      ...user.address,
    };
    delete user.address;
    const upgradedUser = { address: updatedAddress, ...user };
    return upgradedUser;
  }
  const upgradedUser = { ...user };
  return upgradedUser;
}
