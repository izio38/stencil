import * as d from '../../../declarations';
import { isDecoratorNamed, isPropertyWithDecorators } from './utils';
import { MEMBER_TYPE } from '../../../util/constants';
import * as ts from 'typescript';


export function getElementDecoratorMeta(classNode: ts.ClassDeclaration) {
  return classNode.members
    .filter(isPropertyWithDecorators)
    .reduce((membersMeta, member) => {
      const elementDecorator = member.decorators.find(isDecoratorNamed('Element'));

      if (elementDecorator) {
        membersMeta[member.name.getText()] = {
          memberType: MEMBER_TYPE.Element
        };
      }

      return membersMeta;
    }, {} as d.MembersMeta);
}
