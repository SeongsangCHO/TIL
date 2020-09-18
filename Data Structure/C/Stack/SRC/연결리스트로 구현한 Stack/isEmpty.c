/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   isEmpty.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/23 20:52:54 by secho             #+#    #+#             */
/*   Updated: 2020/04/23 21:25:33 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "stack.h"

void	isEmpty(t_stack *stack)
{
	if (stack == NULL || stack->size == 0 || stack->top == NULL)
	{
		printf("stack is empty.\n");
		return;
	}
	printf("stack is not empty.\n");
	return ;
}
