import { IAuthState } from "@modules/auth/daos/authReducer";
import { Masthead } from "@modules/reactive-pixels-ui/structures/Masthead";
import {
  PixelsGrid,
  PixelsGridItem
} from "@modules/reactive-pixels-ui/structures/PixelsGrid";
import { PixelsPreview } from "@modules/reactive-pixels-ui/structures/PixelsPreview";
import { PixelsWrapper } from "@modules/reactive-pixels-ui/structures/PixelsWrapper";
import { ProfileCard } from "@modules/reactive-pixels-ui/structures/ProfileCard";
import { ProfileStats } from "@modules/reactive-pixels-ui/structures/ProfileStats";
import { IBaseTheme, withStyles } from "@modules/reactive-pixels-ui/theme";
import { PixelsComposer } from "@root/composers/PixelsComposer";
import { UserComposer } from "@root/composers/UserComposer";
import { PixelsLikeButton } from "@root/containers/PixelsLikeButton";
import withAuth from "@root/hoc/withAuth";
import withProfile, {
  IGetProfileData,
  IGetProfileProps
} from "@root/hoc/withProfile";
import { css } from "emotion";
import * as React from "react";
import { ChildProps, compose } from "react-apollo";
import { IPixelsModel } from "reactive-pixels-common/models/PixelsModel";
import { IUserModel } from "reactive-pixels-common/models/UserModel";
import { UserFollowButton } from "../UserFollowButton";

interface IClasses {
  grid: string;
}

interface IProps {
  auth: IAuthState;
  classes: IClasses;
  username: string;
}

const styles = (theme: IBaseTheme): IClasses => {
  const { spacers } = theme.sizes;

  return {
    grid: css({
      paddingBottom: spacers.large,
      paddingTop: spacers.large
    })
  };
};

class UserProfile extends React.Component<
  ChildProps<IGetProfileProps & IProps, IGetProfileData>
> {
  public addPixelsGridItem = (pixels: IPixelsModel, user: IUserModel) => {
    const { auth } = this.props;

    return (
      <PixelsGridItem key={pixels.id}>
        <PixelsComposer
          loggedInUserId={auth.user.id}
          pixels={pixels}
          render={pixelsData => (
            <PixelsWrapper>
              <PixelsPreview src={pixelsData.imageSrc} to={pixelsData.url} />
              <PixelsLikeButton
                isLikedByLoggedInUser={pixelsData.isLikedByLoggedInUser}
                onUpdatePixelsLikesVariables={
                  pixelsData.onUpdatePixelsLikesVariables
                }
                likes={pixelsData.likes}
                userLikedPixels={user.likedPixels}
              />
            </PixelsWrapper>
          )}
        />
      </PixelsGridItem>
    );
  };

  public render() {
    const { auth, classes, data, username } = this.props;

    // We cast empty data to expected type and let
    // component look after pending state
    let user = {} as IUserModel;
    let pixels = [] as IPixelsModel[];

    if (data && data.user && data.user.pixels) {
      user = data.user;
      pixels = data.user.pixels;
    }

    return (
      <React.Fragment>
        <UserComposer
          loggedInUserId={auth.user.id}
          user={user}
          render={userData => (
            <React.Fragment>
              <Masthead>
                <ProfileCard
                  avatarUrl={userData.avatarUrl}
                  displayName={userData.displayName}
                  location={userData.location}
                >
                  {userData.username !== username && (
                    <UserFollowButton
                      isFollowedByLoggedInUser={
                        userData.isFollowedByLoggedInUser
                      }
                      userId={userData.id}
                    />
                  )}
                  <ProfileStats
                    numberOfFollowers={userData.numberOfFollowers}
                    numberOfFollowing={userData.numberOfFollowing}
                    numberOfPixels={pixels.length}
                  />
                </ProfileCard>
              </Masthead>

              <PixelsGrid className={classes.grid}>
                {pixels.map(item => this.addPixelsGridItem(item, userData))}
              </PixelsGrid>
            </React.Fragment>
          )}
        />
      </React.Fragment>
    );
  }
}

export default compose(
  withAuth,
  withProfile,
  withStyles(styles)
)(UserProfile);
