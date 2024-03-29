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
  TableColumn,
  TableProps,
} from '@backstage/core-components';
import {
  CreateButtonMod,
  SupportButtonMod,
} from '@internal/core-components';
import { configApiRef, useApi, useRouteRef } from '@backstage/core-plugin-api';
import {
  CatalogFilterLayout,
  EntityLifecyclePicker,
  EntityListProvider,
  EntityProcessingStatusPicker,
  EntityOwnerPicker,
  EntityTagPicker,
  EntityTypePicker,
  UserListFilterKind,
  UserListPicker,
  EntityKindPicker,
  EntityNamespacePicker,
  EntityOwnerPickerProps,
} from '@internal/plugin-catalog-react';
import React, { ReactNode } from 'react';
import { createComponentRouteRef } from '../../routes';
import { CatalogTable, CatalogTableRow } from '../CatalogTable';
import { makeStyles } from '@material-ui/core';
import { catalogTranslationRef } from '../../translation';
import { useTranslationRef } from '@backstage/core-plugin-api/alpha';

/**
 * Props for root catalog pages.
 *
 * @public
 */
export interface DefaultCatalogPageProps {
  initiallySelectedFilter?: UserListFilterKind;
  columns?: TableColumn<CatalogTableRow>[];
  actions?: TableProps<CatalogTableRow>['actions'];
  initialKind?: string;
  tableOptions?: TableProps<CatalogTableRow>['options'];
  emptyContent?: ReactNode;
  ownerPickerMode?: EntityOwnerPickerProps['mode'];
}

const useStyles = makeStyles(theme => ({
  pullUpDropdown: {
    marginTop: '-80px',
  },
}));

export function DefaultCatalogPage(props: DefaultCatalogPageProps) {
  const classes = useStyles();

  const {
    columns,
    actions,
    initiallySelectedFilter = 'owned',
    initialKind = 'component',
    tableOptions = {},
    emptyContent,
    ownerPickerMode,
  } = props;
  const orgName =
    useApi(configApiRef).getOptionalString('organization.name') ?? 'Backstage';
  const createComponentLink = useRouteRef(createComponentRouteRef);
  const { t } = useTranslationRef(catalogTranslationRef);

  return (
    <PageWithHeader title={t('catalog_page_title', { orgName })} themeId="home">
      <Content>
        <ContentHeader title="">
          <CreateButtonMod
            // title={t('catalog_page_create_button_title')}
            title={'ADD'}
            to={createComponentLink && createComponentLink()}
          />
          <SupportButtonMod>All your software catalog entities</SupportButtonMod>
        </ContentHeader>
        <EntityListProvider>
          <CatalogFilterLayout>
            <CatalogFilterLayout.Filters>
              <div className={classes.pullUpDropdown}>
                <EntityKindPicker initialFilter={initialKind} />
                <EntityTypePicker />
                <UserListPicker initialFilter={initiallySelectedFilter} />
                <EntityOwnerPicker mode={ownerPickerMode} />
                <EntityLifecyclePicker />
                <EntityTagPicker />
                <EntityProcessingStatusPicker />
                <EntityNamespacePicker />
              </div>
            </CatalogFilterLayout.Filters>
            <CatalogFilterLayout.Content>
              <CatalogTable
                columns={columns}
                actions={actions}
                tableOptions={tableOptions}
                emptyContent={emptyContent}
              />
            </CatalogFilterLayout.Content>
          </CatalogFilterLayout>
        </EntityListProvider>
      </Content>
    </PageWithHeader>
  );
}
