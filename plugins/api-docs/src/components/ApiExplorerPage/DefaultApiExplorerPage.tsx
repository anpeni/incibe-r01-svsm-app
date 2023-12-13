/*
 * Copyright 2021 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  Content,
  ContentHeader,
  PageWithHeader,
} from '@backstage/core-components';
import {
  TableColumnMod,
  TablePropsMod,
} from '@internal/core-components';
import {
  CreateButtonMod,
  SupportButtonMod,
} from '@internal/core-components';
import { configApiRef, useApi, useRouteRef } from '@backstage/core-plugin-api';
import { CatalogTable, CatalogTableRow } from '@internal/plugin-catalog';
import {
  EntityKindPicker,
  EntityLifecyclePicker,
  EntityListProvider,
  EntityOwnerPicker,
  EntityTagPicker,
  EntityTypePicker,
  UserListFilterKind,
  UserListPicker,
  CatalogFilterLayout,
} from '@internal/plugin-catalog-react';
import React from 'react';
import { registerComponentRouteRef } from '../../routes';
import { makeStyles } from '@material-ui/core';

const defaultColumns: TableColumnMod<CatalogTableRow>[] = [
  CatalogTable.columns.createTitleColumn({ hidden: true }),
  CatalogTable.columns.createNameColumn({ defaultKind: 'API' }),
  CatalogTable.columns.createSystemColumn(),
  CatalogTable.columns.createOwnerColumn(),
  CatalogTable.columns.createSpecTypeColumn(),
  CatalogTable.columns.createSpecLifecycleColumn(),
  CatalogTable.columns.createMetadataDescriptionColumn(),
  CatalogTable.columns.createTagsColumn(),
];

/**
 * DefaultApiExplorerPageProps
 * @public
 */
export type DefaultApiExplorerPageProps = {
  initiallySelectedFilter?: UserListFilterKind;
  columns?: TableColumnMod<CatalogTableRow>[];
  actions?: TablePropsMod<CatalogTableRow>['actions'];
};

const useStyles = makeStyles(theme => ({
  pullUpDropdown: {
    marginTop: '-80px',
  },
}));

/**
 * DefaultApiExplorerPage
 * @public
 */
export const DefaultApiExplorerPage = (props: DefaultApiExplorerPageProps) => {
  const classes = useStyles();

  const { initiallySelectedFilter = 'all', columns, actions } = props;

  const configApi = useApi(configApiRef);
  const generatedSubtitle = `${
    configApi.getOptionalString('organization.name') ?? 'Backstage'
  } API Explorer`;
  const registerComponentLink = useRouteRef(registerComponentRouteRef);

  return (
    <PageWithHeader
      themeId="apis"
      title="APIs"
      subtitle={generatedSubtitle}
      pageTitleOverride="APIs"
    >
      <Content>
        <ContentHeader title="">
          <CreateButtonMod
            title="Register Existing API"
            to={registerComponentLink?.()}
          />
          <SupportButtonMod>All your APIs</SupportButtonMod>
        </ContentHeader>
        <EntityListProvider>
          <CatalogFilterLayout>
            <CatalogFilterLayout.Filters>
              <div className={classes.pullUpDropdown}>
                <EntityKindPicker initialFilter="api" hidden />
                <EntityTypePicker />
                <UserListPicker initialFilter={initiallySelectedFilter} />
                <EntityOwnerPicker />
                <EntityLifecyclePicker />
                <EntityTagPicker />
              </div>
            </CatalogFilterLayout.Filters>
            <CatalogFilterLayout.Content>
              <CatalogTable
                columns={columns || defaultColumns}
                actions={actions}
              />
            </CatalogFilterLayout.Content>
          </CatalogFilterLayout>
        </EntityListProvider>
      </Content>
    </PageWithHeader>
  );
};
